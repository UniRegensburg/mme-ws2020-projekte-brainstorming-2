# Quellcode (Node.js)

Im `src/` Ordner befindet sich der Code in  Typescript, beim builden wird dieser dann zu normalen Javascript kompiliert und in `dist/` gespeichert.
Das Backend ist außerdem mit Jest getestet, die Tests finden sich in `__tests__`

- Im Ordner `socket` befinden sich die Implementation des Socket.IO-Servers und ausgelagert die Funktionen für die verschiedenen Events.
- `interfaces` beinhaltet die Definitionen für Socket Anfragen und Antowrten.
- In `models` sind die Datenbank-Modelle für TypeORM
- In `db` sind Services für die verschiedenen DB Operationen für alle Modelle
