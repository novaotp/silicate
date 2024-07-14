import 'package:app/src/data/models/memo.dart';
import 'package:app/src/data/providers/user.dart';
import 'package:app/src/data/repositories/memo.dart';
import 'package:app/src/layouts/navigation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class Memos extends StatefulWidget {
  const Memos({super.key});

  @override
  State<Memos> createState() => _MemosState();
}

class _MemosState extends State<Memos> {
  late Future<List<MemoModel>> _memosFuture;
  late Future<List<String>> _futureCategories;
  String? _selectedCategory;
  String _searchQuery = '';

  @override
  void initState() {
    super.initState();
    _memosFuture = _fetchMemos();
    _futureCategories = _fetchCategories();
  }

  Future<List<MemoModel>> _fetchMemos() async {
    UserProvider userProvider =
        Provider.of<UserProvider>(context, listen: false);
    MemoRepository memoRepository = MemoRepository(
      baseUrl: dotenv.env["SERVER_URL"]!,
      authToken: userProvider.jwt!,
    );

    final response = await memoRepository.getMemos(
      category: _selectedCategory,
      search: _searchQuery,
    );

    return (response['data'] as List)
        .map((json) => MemoModel.fromJson(json))
        .toList();
  }

  Future<List<String>> _fetchCategories() async {
    UserProvider userProvider =
        Provider.of<UserProvider>(context, listen: false);
    MemoRepository memoRepository = MemoRepository(
      baseUrl: dotenv.env["SERVER_URL"]!,
      authToken: userProvider.jwt!,
    );

    final response = await memoRepository.getCategories();

    return List<String>.from(response['data']);
  }

  void _updateCategory(String? category) {
    setState(() {
      _selectedCategory = category;
      _memosFuture = _fetchMemos(); // Refetch memos with new category
    });
  }

  @override
  Widget build(BuildContext context) {
    return NavigationLayout(
      title: SearchAnchor.bar(
        suggestionsBuilder: (context, controller) async {
          final List<MemoModel> awaitedMemos = await _memosFuture;
          return awaitedMemos.where((memo) {
            return memo.title
                .toLowerCase()
                .contains(controller.text.toLowerCase());
          }).map(
            (memo) => TextButton(
              onPressed: () {
                controller.closeView(memo.title);
                setState(() {
                  _searchQuery = memo.title;
                  _memosFuture = _fetchMemos();
                });
              },
              child: Text(memo.title),
            ),
          );
        },
      ),
      floatingActionButton: const AddMemo(),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
      child: Column(
        children: <Widget>[
          FutureBuilder(
            future: _futureCategories,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(child: Text('Error: ${snapshot.error}'));
              } else {
                final List<String> categories = snapshot.data!;
                return buildCategories(categories);
              }
            },
          ),
          FutureBuilder(
            future: _memosFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(child: Text('Error: ${snapshot.error}'));
              } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                return const Center(child: Text('No memos found.'));
              } else {
                final memos = snapshot.data!;
                return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: SingleChildScrollView(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            "Mémos épinglés",
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          renderMemos(
                              memos.where((memo) => memo.pinned).toList()),
                          const SizedBox(height: 20), // Spacer between sections
                          const Text(
                            "Autres",
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          renderMemos(
                              memos.where((memo) => !memo.pinned).toList()),
                        ],
                      ),
                    ));
              }
            },
          ),
        ],
      ),
    );
  }

  Widget buildCategories(List<String> categories) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: [
            ElevatedButton(
              onPressed: () => _updateCategory(null),
              style: ElevatedButton.styleFrom(
                backgroundColor:
                    _selectedCategory == null ? Colors.blue.shade700 : null,
                foregroundColor:
                    _selectedCategory == null ? Colors.white : null,
              ),
              child: const Text("Tout"),
            ),
            if (categories.isNotEmpty)
              ...categories.map((category) {
                return Padding(
                  padding: const EdgeInsets.only(left: 20),
                  child: ElevatedButton(
                    onPressed: () => _updateCategory(category),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _selectedCategory == category
                          ? Colors.blue.shade700
                          : null,
                      foregroundColor:
                          _selectedCategory == category ? Colors.white : null,
                    ),
                    child: Text(category),
                  ),
                );
              }),
          ],
        ),
      ),
    );
  }

  Widget renderMemos(List<MemoModel> memos) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: memos.map((memo) {
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 4.0),
          child: Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: () => context.go("/app/memos/${memo.id}"),
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.0),
                    ),
                    padding: const EdgeInsets.all(20),
                  ),
                  child: Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          memo.title,
                          style: const TextStyle(
                            fontSize: 20,
                            color: Colors.black,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          memo.content,
                          style: const TextStyle(color: Colors.grey),
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }
}

class AddMemo extends StatefulWidget {
  const AddMemo({super.key});

  @override
  State<AddMemo> createState() => _AddMemoState();
}

class _AddMemoState extends State<AddMemo> {
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
    return FloatingActionButton(
      onPressed: () async {
        final provider = Provider.of<UserProvider>(context, listen: false);
        final MemoRepository memoRepository = MemoRepository(
          baseUrl: dotenv.env["SERVER_URL"]!,
          authToken: provider.jwt!,
        );
        final response =
            await memoRepository.createMemo("My new memo", "", "", false);

        if (!response["success"] && context.mounted) {
          return showToast(context, response["message"]);
        }

        final int id = response["data"];

        if (context.mounted) {
          context.go("/app/memos/$id");
        }
      },
      child: const Icon(Icons.add_rounded),
    );
  }
}
