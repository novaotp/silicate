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

  @override
  void initState() {
    super.initState();
    _memosFuture = _fetchMemos();
  }

  Future<List<MemoModel>> _fetchMemos() async {
    UserProvider userProvider =
        Provider.of<UserProvider>(context, listen: false);
    MemoRepository memoRepository = MemoRepository(
      baseUrl: dotenv.env["SERVER_URL"]!,
      authToken: userProvider.jwt!,
    );

    final response = await memoRepository.getMemos();

    /// TODO : Handle fetch error
    return (response['data'] as List)
        .map((json) => MemoModel.fromJson(json))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    return NavigationLayout(
      title: "Dashboard",
      floatingActionButton: const AddMemo(),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
      child: Column(
        children: <Widget>[
          const Text("Memos page"),
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
                return SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: memos.map((memo) {
                      return ElevatedButton(
                        onPressed: () {
                          context.push("/app/memos/${memo.id}");
                        },
                        child: Text(memo.title),
                      );
                    }).toList(),
                  ),
                );
              }
            },
          ),
        ],
      ),
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
