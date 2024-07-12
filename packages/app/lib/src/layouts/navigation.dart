import 'dart:convert';

import 'package:app/src/data/providers/user.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class NavigationLayout extends StatefulWidget {
  final String title;
  final Widget child;

  const NavigationLayout({required this.title, required this.child, super.key});

  @override
  State<NavigationLayout> createState() => _NavigationLayoutState();
}

class _NavigationLayoutState extends State<NavigationLayout> {
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

  void openDrawer() {
    scaffoldKey.currentState?.openDrawer();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        actions: const <Widget>[UserMenu()],
      ),
      drawer: const NavigationLayoutDrawer(),
      body: Column(
        children: [
          Expanded(child: widget.child),
        ],
      ),
    );
  }
}

class NavigationLayoutDrawer extends StatelessWidget {
  const NavigationLayoutDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primary,
            ),
            child: const Text(
              'Menu',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.home_rounded),
            title: const Text('Dashboard'),
            onTap: () => context.go("/app"),
          ),
          ListTile(
            leading: const Icon(Icons.note_rounded),
            title: const Text('Memos'),
            onTap: () => context.go("/app/memos"),
          ),
          ListTile(
            leading: const Icon(Icons.task_rounded),
            title: const Text('Tasks'),
            onTap: () => context.go("/app/tasks"),
          ),
        ],
      ),
    );
  }
}

class Link {
  const Link(this.label, this.icon, this.selectedIcon);

  final String label;
  final Widget icon;
  final Widget selectedIcon;
}

const List<Link> links = <Link>[
  Link('Messages', Icon(Icons.widgets_outlined), Icon(Icons.widgets)),
  Link('Profile', Icon(Icons.format_paint_outlined), Icon(Icons.format_paint)),
  Link('Settings', Icon(Icons.settings_outlined), Icon(Icons.settings)),
];

class UserMenu extends StatefulWidget {
  const UserMenu({super.key});

  @override
  State<UserMenu> createState() => _UserMenuState();
}

class _UserMenuState extends State<UserMenu> {
  final FocusNode _buttonFocusNode = FocusNode();

  @override
  void dispose() {
    _buttonFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      MenuAnchor(
        menuChildren: subMenu(context),
        builder: userIcon(),
      ),
    ]);
  }

  List<Widget> subMenu(BuildContext context) {
    return <Widget>[
      MenuItemButton(
        child: const Text("Settings"),
        onPressed: () => context.go("/app/settings"),
      ),
      MenuItemButton(
        onPressed: () {
          final provider = Provider.of<UserProvider>(context, listen: false);
          context.go("/login");
          provider.unset();
        },
        style: MenuItemButton.styleFrom(backgroundColor: Colors.red),
        child: const Text(
          "Log Out",
          style: TextStyle(
            color: Colors.white,
          ),
        ),
      )
    ];
  }

  /// Builds the user icon.
  ///
  /// On click, opens the subMenu.
  Widget Function(BuildContext, MenuController, Widget?)? userIcon() {
    return (BuildContext context, MenuController controller, Widget? child) {
      return SizedBox(
        width: 40,
        height: 40,
        child: OutlinedButton(
          focusNode: _buttonFocusNode,
          onPressed: () {
            if (controller.isOpen) {
              controller.close();
            } else {
              controller.open();
            }
          },
          child: CircleAvatar(
            child: Consumer<UserProvider>(
              builder: (context, provider, child) {
                if (provider.user == null) return Container();

                return provider.user!.avatar != null
                    ? Image.memory(base64Decode(provider.user!.avatar!))
                    : Text(provider.user!.initials());
              },
            ),
          ),
        ),
      );
    };
  }
}
