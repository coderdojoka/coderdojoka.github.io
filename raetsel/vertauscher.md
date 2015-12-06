---
titel: Vertauscher  
autor: Mark Weinreuter  
datum: 6.11.15  
version: 0.1  
---

## Hütchenspiel - Der Vertauscher


Bruno und Karl haben ein neues Lieblingsspiel, das Becherspiel. Das Spiel geht wie folgt:  
Es befinden sich 3 undurchsichtige Becher auf einem Tisch. Unter einen der 3 liegt der erste Spieler eine Münze. Der andere Spieler sieht dies und muss sich diesen Becher merken. Nun vertauscht der erste Spieler schnell of oft hintereinander die Position von 2 Bechern. Der zweite Spieler muss sich dabei imemr die Postion des Bechers mit der Münze darunter merken. Nach einigen Vertauschungen hört der erste Spieler auf die Becher zu tauschen und der zweite Spieler muss nun den Becher mit der Münze darunter identifizieren, um das Spiel zu gewinnen.

Allerdings wird Bruno schnell schwindelig, wenn er sich zu sehr auf die Becher konzentriert und verliert den Becher mit der Münze immer aus den Augen.


Da Bruno gut im Zählen ist, beschließen die beiden, das Spiel in einer anderen Variante zu spielen. Es gibt nun nur noch zwei Becher, einen mit einer Münze und einen ohne Münze. Bruno versucht nun lediglich die Anzahl an Vertauschungen mitzuzählen ohne auf die Becher zu achten, um so den Becher zu finden, unter dem die Münze liegt.


![test](raetsel/becher.png)

In diesem Bild sieht man, dass nach 2 Vertauschungen die Münze wieder an ihrer Ausgangsposition zu finden ist.


### Aufgabe 1:
- unter welchem Becher befindet sich die Münze, nach 3, 4, 20 Vertauschungen, wenn sie am Anfang im rechten Becher ist
- mit welcher Regel kann man ganz einfach entscheiden, unter welchem Becher die Münze ist, 
wenn man die Anzahl an Vertauschungen und die Anfangspostion der Münze (rechter Becher oder linker Becher) kennt?


Das obige Spiel ist ein sehr guter Einstieg für ein einfaches Verschlüsselungsverfahren. Dafür betrachten wir ab sofort nur noch enien Becher. Dieser Becher enthält also entweder eine Münze oder nicht. Zudem kann sich der Spieler dafür entscheiden die Becher zu vertauschen, also den Inhalt zu tauschen. Insgesamt gibt es also vier Möglichkeiten:


#### Becher mit Münze und Umtauschen:
![m_l](m_l.png)

Wir tauschen den Becher mit Münze gegen einen Becher ohne Münze.

#### Becher mit Münze ohne Vertauschen:
![m_m](m_m.png)

Wir tauschen nicht und behalten den Becher mit Münze.

#### Becher ohne Münze und Umtauschen:
![l_m](l_m.png)

Wir tauschen den Becher ohne Münze gegen einen Becher mit Münze.

#### Becher ohne Münze ohne Vertauschen:
![l_l](l_l.png)

Wir tauschen nicht und behalten den Becher ohne Münze


Von nun an betrachten wir die Münze im Becher, als "Wert". Der Becher hat eine Münze, oder er hat keine Münze. Es gibt für diesen Becher also zwei Zustände: mit Münze und ohne Münze.
> Wie du vielleicht schon weißt, werden in Computern Daten in Form von Bits gespeichert. 
> Ein Bit ist eine Dateneinheit, die genau zwei Werte annnehmen kann. Ein Bit ist also genau wie unser Becher, er kann eine Münze enthalten oder keine Münze enthalten.
> Bei Bits redet man nicht von Bechern mit Münzen sondern sagt, das ein Bit den Wert 1 (Münze) oder den Wert 0 (keine Münze) haben kann.
> In unserem Fall ist es also egal, ob wir von Bechern oder Bits reden. Die beiden Dinge sind das Gleiche!

Da man mit einzelnen Bits nur schlecht umgehen kann fasst man immer 8 Bits zu einem Byte zusammen. Für uns heißt das also, dass wir nicht mehr nur noch einen Becher haben, sondern 8 Becher nebeinenander:

![Becher](becher.png)









