import 'package:flutter/material.dart';

void showToast(BuildContext context, String content) {
  final scaffold = ScaffoldMessenger.of(context);
  scaffold.showSnackBar(
    SnackBar(
      content: Text(content),
    ),
  );
}
