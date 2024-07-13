import 'dart:developer';

import 'package:app/src/data/services/authentication.dart';
import 'package:app/src/utils/show_toast.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:go_router/go_router.dart';

class Register extends StatefulWidget {
  const Register({super.key});

  @override
  State<Register> createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final AuthService authService =
      AuthService(baseUrl: dotenv.env["SERVER_URL"]!);
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final firstNameController = TextEditingController();
  final lastNameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();

  @override
  void dispose() {
    firstNameController.dispose();
    lastNameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
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
                  controller: firstNameController,
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
                  controller: lastNameController,
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
                  controller: confirmPasswordController,
                ),
                Center(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                    child: ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          if (passwordController.text !=
                              confirmPasswordController.text) {
                            passwordController.text = "";
                            confirmPasswordController.text = "";
                            return showToast(context,
                                "Les mots de passe ne correspondent pas.");
                          }

                          try {
                            final response = await authService.register(
                              firstName: firstNameController.text,
                              lastName: lastNameController.text,
                              email: emailController.text,
                              password: passwordController.text,
                            );

                            if (!response["success"] && context.mounted) {
                              passwordController.text = "";
                              confirmPasswordController.text = "";
                              return showToast(context, response["message"]);
                            }

                            if (context.mounted) {
                              context.pushReplacement("/login");
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
