class MemoModel {
  final int id;
  final String? category;
  final String title;
  final String content;
  final bool pinned;
  final DateTime lastChange;

  const MemoModel({
    required this.id,
    this.category,
    required this.title,
    required this.content,
    required this.pinned,
    required this.lastChange,
  });

  factory MemoModel.fromJson(Map<String, dynamic> json) {
    return MemoModel(
      id: json['id'],
      category: json['category'],
      title: json['title'],
      content: json['content'],
      pinned: json['pinned'],
      lastChange: DateTime.parse(json['lastChange']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'category': category,
      'title': title,
      'content': content,
      'pinned': pinned,
      'lastChange': lastChange.toIso8601String(),
    };
  }
}
