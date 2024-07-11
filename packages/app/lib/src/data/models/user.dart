class UserModel {
  final int id;
  final String firstName;
  final String lastName;
  final String email;
  final String? avatar; // Nullable
  final String bio;
  final DateTime joinedOn;

  const UserModel({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
    this.avatar,
    required this.bio,
    required this.joinedOn,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      email: json['email'],
      avatar: json['avatar'],
      bio: json['bio'],
      joinedOn: DateTime.parse(json['joinedOn']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'avatar': avatar,
      'bio': bio,
      'joinedOn': joinedOn.toIso8601String(),
    };
  }

  String fullName() {
    return "$firstName $lastName";
  }
}
