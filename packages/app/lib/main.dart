import 'package:app/src/data/providers/user.dart';
import 'package:app/src/routes/app/dashboard.dart';
import 'package:app/src/routes/app/memo.dart';
import 'package:app/src/routes/app/memos.dart';
import 'package:app/src/routes/auth/login.dart';
import 'package:app/src/routes/auth/register.dart';
import 'package:app/src/routes/on_boarding.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) => UserProvider(),
        ),
      ],
      child: MaterialApp.router(
        title: 'Flutter Demo',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        routerConfig: router(),
        localizationsDelegates: AppLocalizations.localizationsDelegates,
        supportedLocales: AppLocalizations.supportedLocales,
      ),
    );
  }

  GoRouter router() {
    return GoRouter(
      initialLocation: '/',
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) {
            final userProvider = context.read<UserProvider>();

            if (userProvider.user != null) {
              return const Dashboard();
            }

            return const OnBoarding(title: "On Boarding");
          },
        ),
        GoRoute(
          path: '/register',
          builder: (context, state) => const Register(),
        ),
        GoRoute(
          path: '/login',
          builder: (context, state) => const Login(),
        ),
        GoRoute(
          path: '/app/memos',
          builder: (context, state) => const Memos(),
        ),
        GoRoute(
          path: '/app/memos/:memoId',
          builder: (context, state) =>
              Memo(memoId: int.parse(state.pathParameters["memoId"]!)),
        ),
      ],
      /* redirect: (context, state) {
        final userProvider = context.read<UserProvider>();

        if (userProvider.user == null && state.fullPath!.startsWith("/app")) {
          return "/login";
        }

        if (!state.fullPath!.startsWith("/app") && userProvider.user != null) {
          return "/app";
        }

        return null;
      }, */
    );
  }
}
