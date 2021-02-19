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

## User Stories
- Als Organisierer:in von einem Brainstorming möchte ich die Möglichkeit, einen eigenen Raum zu erstellen, um nur mit meinem Team arbeiten zu können 
- Als Organisierer:in von einem Brainstorming möchte ich andere Teilnehmer:innen mit einem Link einladen können, damit ich mit ihnen arbeite kann 
- Als Organisierer:in von einem Brainstorming möchte ich das Whiteboard speichern können, um in folgenden Sessions auf die Ergebnisse zuzugreifen 
- Als Organisierer:in von einem Brainstorming möchte ich das Whiteboard in einem Bildformat exportieren können, um es als Anlage in einer Arbeit zu verwenden 
- Als Teilnehmer:in möchte ich die Möglichkeit haben, den gesammelten Ideen Literaturquellen hinzuzufügen, um sie später beim Verfassen einer Arbeit zugänglich zu haben 
- Als Teilnehmer:in eines Brainstormings möchte ich die Möglichkeit haben Bilder auf das Whiteboard hinzuzufügen, um so möglichst einfach meine Ideen mit anderen zu teilen. 
- Als Teilnehmer:in eines Brainstormings möchte ich die Möglichkeit haben kleinere Zeichnungen auf dem Whiteboard anzufertigen, um so meine Ideen möglichst einfach und anschaulich darzustellen. 
- Als Teilnehmer:in möchte ich die Möglichkeit haben unsere Notizen durch Verbindungspfeile zu verknüpfen um einen besseren Überblick zu bekommen und Schlussfolgerungen besser nachvollziehen zu können.
- Als Teilnehmer:in möchte ich kleine Notizzettel in verschiedenen Farben auswählen können, damit die verschiedenen wichtigen Gedanken direkt herausstechen können. 
- Als Teilnehmer:in möchte ich per Chat mit meinen Kollegen kommunizieren können um mich mit Ihnen über unsere Ideen austauschen zu können. 
- Als Teilnehmer:in möchte ich die Möglichkeit haben Notizen von anderen Teilnehmer:innen mithilfe von Sternen zu bewerten, um so ein möglichst einfaches und direktes Feedback zu geben. 
- Als Teilnehmer:in eines Brainstormings möchte ich die Möglichkeit haben, das Literaturverzeichnis als separate Text-Datei zu exportieren, um damit im Anschluss möglichst einfach arbeiten zu können. 
