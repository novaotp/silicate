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

  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  void showToast(BuildContext context, String content) {
    final scaffold = ScaffoldMessenger.of(context);
    scaffold.showSnackBar(
      SnackBar(
        content: Text(content),
      ),
    );
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
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
                  controller: emailController,
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
                  controller: passwordController,
                ),
                Center(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                    child: ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          try {
                            final response = await authService.login(
                              email: emailController.text,
                              password: passwordController.text,
                            );

                            if (!response["success"] && context.mounted) {
                              passwordController.text = "";
                              return showToast(context, response["message"]);
                            }

                            final UserModel user =
                                UserModel.fromJson(response["data"]["user"]);
                            final String jwt = response["data"]["jwt"];

                            userState.set(user);
                            userState.setJwt(jwt);

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
