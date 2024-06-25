import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Crypto QuikPay',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Crypto QuikPay'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Add your onPressed code here!
          },
          child: Text('Press Me'),
        ),
      ),
    );
  }
}
