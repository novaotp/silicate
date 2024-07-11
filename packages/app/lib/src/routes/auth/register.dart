import 'dart:developer';

import 'package:app/src/data/models/user.dart';
import 'package:app/src/data/providers/user.dart';
import 'package:app/src/data/services/authentication.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class Register extends StatefulWidget {
  const Register({super.key});

  @override
  State<Register> createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final AuthService authService = AuthService();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  String firstName = "";
  String lastName = "";
  String email = "";
  String password = "";
  String confirmPassword = "";

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
    var userProvider = context.watch<UserProvider>();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text("Register"),
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
                      const InputDecoration(hintText: "Entre ton prénom"),
                  autocorrect: false,
                  validator: (String? value) {
                    if (value == null || value.isEmpty) {
                      return 'Prénom obligatoire.';
                    }
                    return null;
                  },
                  onChanged: (value) => (firstName = value),
                ),
                TextFormField(
                  decoration: const InputDecoration(hintText: "Entre ton nom"),
                  autocorrect: false,
                  validator: (String? value) {
                    if (value == null || value.isEmpty) {
                      return 'Nom obligatoire.';
                    }
                    return null;
                  },
                  onChanged: (value) => (lastName = value),
                ),
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
                TextFormField(
                  decoration: const InputDecoration(
                      hintText: "Confirme ton mot de passe"),
                  autocorrect: false,
                  validator: (String? value) {
                    if (value == null || value.isEmpty) {
                      return 'Confirmation du mot de passe obligatoire.';
                    }
                    return null;
                  },
                  onChanged: (value) => (confirmPassword = value),
                ),
                Center(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                    child: ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          if (password != confirmPassword) {
                            return showToast(context,
                                "Les mots de passe ne correspondent pas.");
                          }

                          try {
                            final response = await authService.register(
                              firstName: firstName,
                              lastName: lastName,
                              email: email,
                              password: password,
                            );

                            if (!response["success"]) {
                              if (context.mounted) {
                                return showToast(context, response["message"]);
                              }
                            }

                            final UserModel user = response["data"];

                            userProvider.set(user);

                            if (context.mounted) {
                              context.pushReplacement("/app");
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
