import 'package:app/src/data/providers/user.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({super.key});

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  @override
  Widget build(BuildContext context) {
    var userProvider = context.watch<UserProvider>();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text("Dashboard"),
      ),
      body: Column(
        children: <Widget>[
          Builder(
            builder: (BuildContext builder) {
              return Text("Bienvenue ${userProvider.user!.fullName()}");
            },
          ),
          Builder(
            builder: (BuildContext builder) {
              return Text("Bienvenue ${userProvider.user!.joinedOn.toLocal()}");
            },
          ),
        ],
      ),
    );
  }
}
