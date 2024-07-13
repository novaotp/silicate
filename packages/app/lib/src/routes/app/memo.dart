import 'dart:async';

import 'package:app/src/data/models/memo.dart';
import 'package:app/src/data/providers/user.dart';
import 'package:app/src/data/repositories/memo.dart';
import 'package:app/src/utils/show_toast.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
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
      baseUrl: dotenv.env["SERVER_URL"]!,
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
          icon: const Icon(Icons.arrow_back_rounded),
        ),
        actions: <Widget>[
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
                MemoModel memo = snapshot.data!;
                return Row(
                  children: [
                    PinnedButton(memo: memo),
                    DeleteButton(memo: memo)
                  ],
                );
              }
            },
          ),
        ],
      ),
      body: Column(
        children: <Widget>[
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
                MemoModel memo = snapshot.data!;
                return MemoData(memo: memo);
              }
            },
          ),
        ],
      ),
    );
  }
}

/// Displays the data of the memo when it loaded successfully.
///
/// ? Find better name
class MemoData extends StatefulWidget {
  final MemoModel memo;

  const MemoData({required this.memo, super.key});

  @override
  State<MemoData> createState() => _MemoDataState();
}

class _MemoDataState extends State<MemoData> {
  late MemoRepository _memoRepository;
  final _titleController = TextEditingController();
  final _contentController = TextEditingController();
  String? _category;
  bool _pinned = false;
  Timer? _debounce;

  @override
  void initState() {
    super.initState();
    _titleController.text = widget.memo.title;
    _contentController.text = widget.memo.content;
    _category = widget.memo.category;
    _pinned = widget.memo.pinned;
    UserProvider userProvider =
        Provider.of<UserProvider>(context, listen: false);
    _memoRepository = MemoRepository(
      baseUrl: dotenv.env["SERVER_URL"]!,
      authToken: userProvider.jwt!,
    );
  }

  @override
  void dispose() {
    _debounce?.cancel();
    _titleController.dispose();
    _contentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          TextField(
            controller: _titleController,
            decoration: const InputDecoration(
              labelText: 'Title',
            ),
            onChanged: (value) => _editMemo(context),
          ),
          const SizedBox(height: 20),
          TextField(
            controller: _contentController,
            decoration: const InputDecoration(
              labelText: 'Content',
            ),
            keyboardType: TextInputType.multiline,
            maxLines: null,
            onChanged: (value) => _editMemo(context),
          ),
        ],
      ),
    );
  }

  void _editMemo(BuildContext context) async {
    if (_debounce?.isActive ?? false) {
      _debounce?.cancel();
    }

    _debounce = Timer(const Duration(milliseconds: 500), () async {
      final response = await _memoRepository.updateMemo(
          id: widget.memo.id,
          title: _titleController.text,
          content: _contentController.text,
          category: _category,
          pinned: _pinned);

      if (!response["success"] && context.mounted) {
        return showToast(context, response["message"]);
      }

      widget.memo.title = _titleController.text;
      widget.memo.content = _contentController.text;
    });
  }
}

class PinnedButton extends StatefulWidget {
  final MemoModel memo;

  const PinnedButton({required this.memo, super.key});

  @override
  State<PinnedButton> createState() => _PinnedButtonState();
}

class _PinnedButtonState extends State<PinnedButton> {
  late MemoRepository _memoRepository;
  Timer? _debounce;
  late bool _pinned;

  @override
  void initState() {
    super.initState();
    _pinned = widget.memo.pinned;
    UserProvider userProvider =
        Provider.of<UserProvider>(context, listen: false);
    _memoRepository = MemoRepository(
      baseUrl: dotenv.env["SERVER_URL"]!,
      authToken: userProvider.jwt!,
    );
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: () => _editMemo(context),
      icon: Icon(
        _pinned ? Icons.push_pin : Icons.push_pin_outlined,
      ),
    );
  }

  void _editMemo(BuildContext context) async {
    if (_debounce?.isActive ?? false) {
      _debounce?.cancel();
    }

    setState(() {
      _pinned = !_pinned;
    });

    _debounce = Timer(const Duration(milliseconds: 500), () async {
      final response = await _memoRepository.updateMemo(
        id: widget.memo.id,
        title: widget.memo.title,
        content: widget.memo.content,
        category: widget.memo.category,
        pinned: _pinned,
      );

      if (!response["success"] && context.mounted) {
        return showToast(context, response["message"]);
      }

      widget.memo.pinned = _pinned;
    });
  }
}

class DeleteButton extends StatefulWidget {
  final MemoModel memo;

  const DeleteButton({required this.memo, super.key});

  @override
  State<DeleteButton> createState() => _DeleteButtonState();
}

class _DeleteButtonState extends State<DeleteButton> {
  late MemoRepository _memoRepository;

  @override
  void initState() {
    super.initState();
    UserProvider userProvider =
        Provider.of<UserProvider>(context, listen: false);
    _memoRepository = MemoRepository(
      baseUrl: dotenv.env["SERVER_URL"]!,
      authToken: userProvider.jwt!,
    );
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: () => _deleteMemo(context),
      icon: const Icon(Icons.delete_outline_rounded),
    );
  }

  void _deleteMemo(BuildContext context) async {
    final response = await _memoRepository.deleteMemo(widget.memo.id);

    if (!response["success"] && context.mounted) {
      return showToast(context, response["message"]);
    }

    if (context.mounted) {
      showToast(context, response["message"]);
      context.go("/app/memos");
    }
  }
}
