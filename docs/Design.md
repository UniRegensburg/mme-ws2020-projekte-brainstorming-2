# Software Desing für Brainstorming 2

Unsere Anwendung unterteilt sich in einen Server und einen Client. Serverseitig implementieren wir zwei verschiedene Kommunikationswege: wir stellen eine REST API bereit, für alle Anfragen, die keine Echtzeitkommunikation benötigen und einen Websocket Server, für Echtzeitkommunikation. Über die REST API geschieht das Erstellen eines neuen Raumes, der Download von Ergebnissen aus dem Whiteboard und ggf. die Exportfunktion des Literaturverzeichnisses. Die Websocket API verteilt die verschiedenen Events auf dem Canvas (wie zum Beispiel Zeichnung, hinzufügen und manipulieren von Objekten), die Chatnachrichten, sowie neue Literatureinträge zwischen den verbundenen Teilnehmer:innen. Die REST API wird mit den gegebenen Möglichkeiten von Express umgesetzt, für die Echtzeitkommunikation haben wir uns für Socket.io als Abstraktion von Websockets entschieden und nicht für speziellere Frameworks, da Socket.io weit verbreitet ist und sowohl eine solide Dokumentation als auch Hilfe und Tutorials online hat. Die verschiedenen Räume wollen wir mit der Room API von Socket.IO umsetzen. Datenstrukturen für verteilte Events könnten wie folgt aussehen: 

```typescript
type SocketEvent = {
  type: string //e.g. "CHAT" or "DRAW"
  payload: Record<string, any>
}

type AddLiteratureRequest = {
  name: string
  author?: string | string[]
  title?: string
  pages?: number[]
  link?: string
}
```

Der Stand des Whiteboards sowie das Literaturverzeichnis sollen in einer Datenbank persistiert werden. Dazu nutzen wir MongoDB, um die JSON-strukturierten Daten des Whiteboards und Einträge im Literaturverzeichnis speichern zu können. Speicherung des Literaturverzeichnisses soll automatisch bei jedem Eintrag geschehen (Events), das Whiteboard muss manuell gespeichert werden. 

Clientseitig nutzen wir Fabric.JS um auf dem Whiteboard Manipulation umzusetzen und den State des Boards zur Speicherung zu erhalten. Jede Manipulation wird über den Socket.IO Client mit den anderen verbundenen Teilnehmer:innen geteilt. Ebenso wird jede hinzugefügte Quelle und Chatnachrichten über den Websocket verteilt. Der Client unterteilt sich dabei in ein Logikmodul, welches die Kommunikation mit dem Server herstellt und Events weitergibt, und einem UI Modul, welches Events vom Logikmodul grafisch umsetzt und eigene Änderungen an das Logikmodul zu Kommunikation weitergibt. Beide Bereiche sollen über einen gemeinsamen Event-Bus kommunizieren. 
