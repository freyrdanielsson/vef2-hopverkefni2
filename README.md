# Hópverkefni 2

Hópverkefni 2 snýst um að útbúa react framenda ofan á vefþjónustu úr hópaverkefni 1. Þessi framendi byggir á [þessari sýnilausn](https://github.com/vefforritun/vef2-2018-h1-synilausn).

# Verkefni í hnotskurn

## Síða í keyrslu

Lausn á þessu verkefni má finna [hér](https://warm-shore-65664.herokuapp.com)

## Notendaumsjón

### Innskráning

Mælt er með því að búa til notanda til þess að skoða lausnina og alla þá möguleika sem eru í boði.
Einnig er hægt að nota notanda sem er til en það er notandi: *admin* lykilorð: *123123*.


### Aðgangsstýring

Óinnskráðir notendur geta:

* Skoðað allar síður af bókum á `/books`
* Leitað að bókum, t.d. `/books?query=book`
* Búið sér til aðgang á `/register`
* Skráð sig inn á `/login`

Innskráðir notendur geta:

* Uppfært upplýsingar um sjálfa sig á `/profile`, skipta skal aðgerðum upp í
  - Setja inn mynd
  - Uppfæra nafn
  - Uppfæra lykilorð
  - Séð lestur á bókum og eytt lestri
* Skráð nýja bók á `/books/new`
* Skoðað bók á `/books/:id` og á sama stað
  - Skráð lestur á bók
* Uppfært bók sem til er á `/books/:id/edit`
* Skoðað lista af notendum á `/users`
* Skoðað notendur og lestur þeirra á `/users/:id`


## Tenging við vefþjónustu

Allar tengingar við vefþjónustu eru í [api.js](src/api.js). Til að breyta um vefjþjónustu [sjá](#uppsetning)

## Útlit

Líkist hvað mest þessum [skjáskotum](layout/).

## Almennt

Notað er redux fyrir auðkenningu og notanda. Einnig er redux notað við lestur á bókum og flest allt sem okkur datt í hug til að auðvelda það að halda utan um stöður og bregðast rétt við í öllum componentum sem þarf að bregðast við þegar staða breytist.


* Verkefni sett upp með `create-react-app` með öllum dependencies sem ætti að þurfa
* Mynd til að birta af notanda ef engin mynd er til staðar
* `components/private-route` til að aðgangsstýra routes, sjá dæmi í `App.js`
* `api.js` sem ætti að innihalda allar tengingar við vefþjónustu, gefin er byrjun á `get` falli


## Uppsetning

Hægt er að halda áfram með þetta verkefni með því að clone-a þetta repo. Ath samt að það byggir á bakenda frá [osk](https://github.com/vefforritun/vef2-2018-h1-synilausn) sem hefur verið settur upp á [heroku](https://vef2-h1-synilausn.herokuapp.com) af okkur. Til að tengjast annari vefþjónustu skal einfaldlega breyta slóð sem gefin er upp í [.env](.env)

```bash
> git clone https://github.com/freyrdanielsson/vef2-hopverkefni2.git
> cd vef2-2018-h2
> git remote remove origin # fjarlægja remote sem verkefni er í
> git remote add origin <slóð á repo> # bæta við í þínu repo
> git push
```

## Höfundir

* **Arnar Pétursson** - arp25@hi.is - Hugbúnaðarverkfræðinemi
* **Freyr Saputra Daníelsson** - fsd1@hi.is - Hugbúnaðarverkfræðinemi
* **Markús Freyr Sigurbjörnsson** - mfs4@hi.is - Hugbúnaðarverkfræðinemi
