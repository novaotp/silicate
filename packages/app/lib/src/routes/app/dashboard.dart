import 'package:app/src/data/providers/user.dart';
import 'package:app/src/layouts/navigation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({super.key});

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  @override
  Widget build(BuildContext context) {
    return NavigationLayout(
      title: "Dashboard",
      child: Column(
        children: <Widget>[
          Consumer<UserProvider>(
            builder: (context, provider, child) {
              return Column(
                children: <Widget>[
                  Text(AppLocalizations.of(context)!.helloWorld),
                  Text("Bienvenue ${provider.user?.fullName()}"),
                  Text("${provider.user?.joinedOn.toLocal()}"),
                ],
              );
            },
          )
        ],
      ),
    );
  }
}
