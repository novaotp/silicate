import 'dart:developer';

import 'package:app/src/data/models/user.dart';
import 'package:app/src/data/providers/user.dart';
import 'package:app/src/data/services/authentication.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final AuthService authService = AuthService();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  String email = "";
  String password = "";

  void showToast(BuildContext context, String content) {
    final scaffold = ScaffoldMessenger.of(context);
    scaffold.showSnackBar(
      SnackBar(
        content: Text(content),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    var userState = context.watch<UserProvider>();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text("Login"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Center(
          child: Form(
            key: _formKey,
            child: Column(
              children: <Widget>[
                TextFormField(
                  decoration:
                      const InputDecoration(hintText: "Entre ton email"),
                  autocorrect: false,
                  validator: (String? value) {
                    if (value == null || value.isEmpty) {
                      return 'Email obligatoire.';
                    }
                    return null;
                  },
                  onChanged: (value) => (email = value),
                ),
                TextFormField(
                  decoration:
                      const InputDecoration(hintText: "Entre ton mot de passe"),
                  autocorrect: false,
                  validator: (String? value) {
                    if (value == null || value.isEmpty) {
                      return 'Mot de passe obligatoire.';
                    }
                    return null;
                  },
                  onChanged: (value) => (password = value),
                ),
                Center(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                    child: ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          try {
                            final response = await authService.login(
                              email: email,
                              password: password,
                            );

                            if (!response["success"]) {
                              if (context.mounted) {
                                return showToast(context, response["message"]);
                              }
                            }

                            final UserModel user =
                                UserModel.fromJson(response["data"]["user"]);

                            userState.set(user);

                            if (context.mounted) {
                              context.pushReplacement("/");
                            }
                          } catch (error) {
                            log(error.toString());
                          }
                        }
                      },
                      child: const Text('Submit'),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
