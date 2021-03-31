# Features für Brainstorming 2 

Brainstorming 2 soll eine Plattform zur kollaborativen Erarbeitung von Ideen werden. Als primäre Zielgruppe sehen wir dabei Mitglieder einer Forschungseinrichtung die unkompliziert miteinander arbeiten wollen. 

| Feature | Beschreibung | Priorität | Geschätzter Aufwand | Betroffene Schichten |
|-|-|-|-|-|
| Whiteboard | Freie Zeichenfläche, auf der Nutzer:innen zusammen Gedanken sammeln können (in der Form von freien Zeichnungen und Text)   | hoch | 2 Tage  | Core  |
| Whiteboard-Textbausteine | Element, was Nutzer:innen mit Text befüllen können und von anderen bearbeitet werden kann  | hoch | 1 Tag | Core |
| Whiteboard-Zeichungen | Möglichkeit, in Echtzeit auf dem Whiteboard zu zeichnen | hoch | 1 Tag | Core |
| Image Support  | Nutzer:innen sollen dem Whiteboard Bilder hinzufügen und verschieben können   | hoch | 2 Tage  | Core |
| Export | Der Inhalt soll sich exportieren lassen (als Bild) damit die Ergebnisse außerhalb der Anwendung genutzt werden können(z.B. Dokumentation)   | mittel | 1 Tag  | Usability  |
| Chat | Kommunikation über einen Schriftchat  | Nice-to-have  | 1 Tag  | Kommunikation  |
| Rooms | Mehrere Gruppen sollen parallel arbeiten können  | hoch | 2 Tage  | Usability |
| Persistence | Räume sollen ihren Inhalt speichern und ggf wieder abrufbar sein ( damit in der zweiten Sitzung weitergemacht werden kann, innerhalb der Anwendung)   | niedrig | 3 Tage  | Usability  |
| ~Bewertung~ | ~Nutzer:innen sollen Ideen mit Sternen bewerten können~  |  ~mittel~ | ~1 Tag~  | ~Kommunikation~  |
| Literaturverzeichnis | Nutzer:innen sollen dem Whiteboard Verknüpfungen zu Literatur hinzufügen können | mittel | 1 Tag | Spezifizierung |
| Unique Link | Jeder Raum soll einen eigenen Link erhalten, mit dem die Nutzer:innen dem Raum beitreten können | mittel | 1 Tag | Usability |

## Umsetzung 

Anfangs werden wir uns auf die Umsetzung der grundlegenen Funktionalitäten kümmern. Dafür orientieren wir uns an Nutzer:innen, die nur eine Möglichkeit zur dezentralen gemeinsamen Sammlung von Ideen suchen und implementieren das Whiteboard und die Möglichkeit Bilder hinzuzufügen.  
Um größere Organistationen zu unterstützen, wollen wir im nächsten Schritt die Möglichkeit zu verschiedenen Räumen und zum Export der Inhalte schaffen. 
Abschließend wollen wir uns um Features kümmern, welche die Nutzbarkeit weiter ergänzen. ~Zum Beispiel möchten wir eine Bewertungsfunktion für die Nutzer:innen erstellen~ und die App um einen Chat ergänzen. 
Bei der Priorisierung gehen wir also von den grundlegenen Funktionalitäten aus, um möglichst schnell ein nutzbares Produkt zu haben. 

## Use Case
Eine Gruppe von Studierenden schreibt zusammen eine Hausarbeit. Zur Findung der Forschungsfrage nutzen sie unsere App. Ein Mitglied der Gruppe erstellt einen Raum indem er/sie auf unsere Seite geht. Bei der Erstellung wird dem Raum eine UID zugewiesen, über die die anderen Mitglieder dem Raum beitreten können. Im Raum angekommen sammeln sie ihre Ideen, indem sie Textbausteine auf dem Whiteboard zusammentragen und diese mit Zeichnungen, Bildern und/oder Verbindungen (Freihandzeichung) anreichern. Zur Abstimmmung untereinander steht ihnen ein Chat zur Verfügung. Falls sie bereits Literatur zu ihrem Thema haben, können sie diese an den zugehörigen Ideen referenzieren. Dazu erstellen sie einen neuen Eintrag im Literaturverzeichnis und fügen dem Whiteboard einen Sticker hinzu, der zu diesem Eintrag verlinkt. Wenn sie mit der Sammlung fertig sind, bewerten sie die verschiedenen Ideen, indem sie den entsprechenden Ideen (gruppiert durch ihre räumliche Nähe beim erstellen) ~eine Anzahl an Stern-Stickern hinzufügen~. Wenn sie ihre Arbeit an einem anderen Zeitpunkt fortsetzen möchten, können sie jederzeit zu dem Link des Raumes zurückkehren oder ihr Whiteboard exportieren, wenn sie fertig sind, um es z.B. zur Dokumentation in ihrer Arbeit zu benutzen. 
