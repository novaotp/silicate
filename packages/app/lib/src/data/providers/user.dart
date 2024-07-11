import 'dart:convert';
import 'dart:developer';

import 'package:app/src/data/models/user.dart';
import 'package:app/src/data/services/file.dart';
import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  final FileService fileService = FileService();
  UserModel? _user;

  UserModel? get user => _user;

  UserProvider() {
    _init();
  }

  /// Loads the user from the file.
  Future<void> _init() async {
    _user = await _readUserFromFile();
  }

  /// Sets a new user for the global state.
  ///
  /// Persists the data on disk.
  void set(UserModel user) {
    _user = user;
    _writeUserToFile(user);
    notifyListeners();
  }

  /// Sets a new user for the global state.file
  ///
  /// Persists the data on disk.
  void unset() {
    _user = null;
    _writeUserToFile(user);
    notifyListeners();
  }

  Future<UserModel?> _readUserFromFile() async {
    try {
      final file = await fileService.getFile("user.txt");

      if (!(await file.exists())) {
        await file.create();
      }

      final contents = await file.readAsString();

      if (contents.isEmpty) {
        return null;
      }

      return UserModel.fromJson(jsonDecode(contents) as Map<String, dynamic>);
    } catch (error) {
      log('An error occurred while reading the user from file : ${error.toString()}');
      return null;
    }
  }

  Future<void> _writeUserToFile(UserModel? user) async {
    final file = await fileService.getFile("user.txt");

    if (user != null) {
      file.writeAsString(jsonEncode(user));
    } else {
      file.writeAsString("");
    }
  }
}
