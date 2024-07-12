import 'package:app/src/data/models/memo.dart';
import 'package:app/src/data/providers/user.dart';
import 'package:app/src/data/repositories/memo.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class Memo extends StatefulWidget {
  final int memoId;

  const Memo({required this.memoId, super.key});

  @override
  State<Memo> createState() => _MemoState();
}

class _MemoState extends State<Memo> {
  late Future<MemoModel> _memoFuture;

  @override
  void initState() {
    super.initState();
    _memoFuture = _fetchMemo();
  }

  Future<MemoModel> _fetchMemo() async {
    UserProvider userProvider =
        Provider.of<UserProvider>(context, listen: false);
    MemoRepository memoRepository = MemoRepository(
      baseUrl: "http://localhost:8080",
      authToken: userProvider.jwt!,
    );

    final response = await memoRepository.getMemo(widget.memoId);

    /// TODO : Handle fetch error
    return MemoModel.fromJson(response["data"] as Map<String, dynamic>);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        leading: IconButton(
            onPressed: () => context.go("/app/memos"),
            icon: const Icon(Icons.arrow_back_rounded)),
      ),
      body: Column(
        children: <Widget>[
          const Text("Memos page"),
          FutureBuilder(
            future: _memoFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(child: Text('Error: ${snapshot.error}'));
              } else if (!snapshot.hasData) {
                return const Center(child: Text('No memo found.'));
              } else {
                final memo = snapshot.data!;
                return Column(children: <Widget>[
                  Text(memo.title),
                  const SizedBox(height: 20),
                  Text("Pinned ? ${memo.pinned.toString()}")
                ]);
              }
            },
          ),
        ],
      ),
    );
  }
}
