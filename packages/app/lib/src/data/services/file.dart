import 'dart:io';

import 'package:path_provider/path_provider.dart';

class FileService {
  /// Returns the path to the `AppData` directory.
  Future<String> _localPath() async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }

  /// Returns the requested file.
  Future<File> getFile(String filename) async {
    final path = await _localPath();
    return File('$path/$filename');
  }
}
