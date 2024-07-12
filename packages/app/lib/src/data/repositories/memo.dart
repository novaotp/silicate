import 'dart:convert';
import 'package:app/src/data/models/memo.dart';
import 'package:http/http.dart' as http;

class MemoRepository {
  final String baseUrl;
  final String authToken;

  MemoRepository({required this.baseUrl, required this.authToken});

  Future<dynamic> getMemo(int id) async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/v1/memos/$id'),
      headers: {
        'Authorization': authToken,
        'Accept': 'application/json',
      },
    );

    return jsonDecode(response.body);
  }

  Future<dynamic> getMemos({String? category, String? search}) async {
    final queryParams = {
      'category': category,
      'search': search,
    }..removeWhere((key, value) => value == null);

    final uri = Uri.parse('$baseUrl/api/v1/memos')
        .replace(queryParameters: queryParams);

    final response = await http.get(
      uri,
      headers: {
        'Authorization': authToken,
        'Accept': 'application/json',
      },
    );

    return jsonDecode(response.body);
  }

  Future<dynamic> createMemo(
      String title, String content, String category, bool pinned) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/v1/memos'),
      headers: {
        'Authorization': authToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, dynamic>{
        'category': category,
        'title': title,
        'content': content,
        'pinned': pinned
      }),
    );

    return jsonDecode(response.body);
  }

  Future<dynamic> updateMemo(MemoModel memo) async {
    final response = await http.put(
      Uri.parse('$baseUrl/api/v1/memos/${memo.id}'),
      headers: {
        'Authorization': authToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(memo.toJson()),
    );

    return jsonDecode(response.body);
  }

  Future<dynamic> deleteMemo(int id) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/api/v1/memos/$id'),
      headers: {
        'Authorization': authToken,
        'Accept': 'application/json',
      },
    );

    return jsonDecode(response.body);
  }

  Future<dynamic> getCategories() async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/v1/memos/categories'),
      headers: {
        'Authorization': authToken,
        'Accept': 'application/json',
      },
    );

    return jsonDecode(response.body);
  }
}
