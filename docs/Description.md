## App

[Beschreiben Sie hier in einer kurzen Zusammenfassung Hintergrund, Ziele und Funktionen Ihrer Anwendung. Fügen Sie einen repräsentativen Screenshot ein. Dokumentieren Sie anschließend ausführlich alle Funktionen der Anwendung. Verwenden Sie Screenshots und ggf. auch Gif-Dateien um zentrale Elemente und Abläufe zu beschreiben.]

StudyBoard soll eine Plattform zur kollaborativen Erarbeitung von Ideen werden. Als primäre Zielgruppe sehen wir dabei Mitglieder einer Forschungseinrichtung die unkompliziert miteinander arbeiten wollen. Dabei bieten wir den nutzer:innen einen Ort an dem sie in ihrere Gruppe oder alleine Ideen schnell festhalten, teilen, gemeinsam ausarbeiten und am Ende für die Weiterverwendung in Arbeit oder ähnlichem verwenden können. Dazu bauen wir eine Webapp mit einem Whitebaord als Hauptfeature, auf dem sich die Nutzer:innen austauschen können. Für einfachere Kommunikation haben wir noch einen Chat eingebaut und außerdem, für die akademische Zielgruppe, eine Literaturverwaltung hinzugefügt. Die Webapp kann von verschiedenen Gruppen unabhängig benutzt werden und bietet Möglichkeiten die Daten zu persistieren.

### Nutzungsszenarien
#### Mehrere Räume
Nutzer:innen können beim Betreten der Webapp einen Raum für ihre Gruppe anlegen, oder mit einem Link einem bereits erstellten Raum beitreten. Beim beitreten bekommen sie den aktuellen Stand des Whiteboards und alle Literatureinträge übermittelt und können so direkt mitarbeiten.

![room create](https://github.com/UniRegensburg/mme-ws2020-projekte-brainstorming-2/blob/dev/docs/assets/ezgif.com-gif-maker.gif?raw=true)

![room join](https://github.com/UniRegensburg/mme-ws2020-projekte-brainstorming-2/blob/dev/docs/assets/startscreen%2Croomlink.gif?raw=true)

#### Whiteboard
Der aktuelle Stand des Whiteboards wird in Echtzeit an alle im Raum kommuniziert. Davon unbetroffen sind Mitglieder anderer Gruppen, jede Gruppe hat einen eigenen Raum und interferiert nicht.

![whiteboard](https://github.com/UniRegensburg/mme-ws2020-projekte-brainstorming-2/blob/dev/docs/assets/Whiteboard_GIF.gif?raw=true)

#### Werkzeuge
Das Whiteboard stellt verschiedene Werkzeuge bereit um Ideen zu präsentieren und manipulieren:
- Stift  
  Einfachstes Werkzeug mit dem man verschieden dicke Linien erstellen kann
- Formen  
  Man kann Rechtecke und Kreise hinzufügen und diese bearbeiten
- Pfeile  
  Man kann Verbindungspfeile als logische Verknüpfung zwischen den Elementen hinzufügen
- Notizen und Text  
  Man kann dem Whiteboard Text als Freitext oder auf einer farbigen Notiz hinzufügen
- Bilder  
  Bis zu 50kb können auch Bilder in das Whiteboard geladen werden
- Export  
  Um das Whiteboard anschließen verwerten zu können, kann man den Inhalt als Bild exportieren.
  
![tools](https://github.com/UniRegensburg/mme-ws2020-projekte-brainstorming-2/blob/dev/docs/assets/Tools_PNG.PNG?raw=true)

Auf dem Whiteboard kann man mit verschiedenen Farben zeichnen. Das macht es einfacher verschiedene Ideen voneinander zu trennen.

![colors](https://github.com/UniRegensburg/mme-ws2020-projekte-brainstorming-2/blob/dev/docs/assets/Color_PNG.PNG?raw=true)

#### Literatur
Um zu Ideen auch Literatur oder Onlinequellen hinzuzufügen, hat die Webapp ein Literaturverzeichnis. Die Referenzen an jedem Eintrag machen es leicht, sie im Whiteboard zu verankern.

// BILD LITERATUR

Man kann den Inhalt des Verzeichnisses am Ende als Text-Datei exportieren.

// BILD EXPORT

#### Chat
Um besser miteinander kommunizieren zu können, kann man sich über den Chat Nachrichten schreiben. Um die Privatssphäre der Nutzer:innen zu schützen, werden diese Nachrichten nicht gespeichert und können nicht exportiert werden.

![chat](https://github.com/UniRegensburg/mme-ws2020-projekte-brainstorming-2/blob/dev/docs/assets/Chat_GIF.gif?raw=true)
