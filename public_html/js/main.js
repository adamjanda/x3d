  var wybrany = null;
  var wybranyName = null;
  var iloscObj = 0;
  var move = null;
  var moveDir = null;

  var keyboard = null;
  var campos = "0 0 10";

  function keydown(event)
  {
    var e = document.getElementById("move");
    keyboard = e.options[e.selectedIndex].text;
    var rot = null;
    if (keyboard=="Rotate")
    {
      if (event.keyCode == 38) {  rot = "rot1"; wart = 0.025; }
      if (event.keyCode == 40) {  rot = "rot1"; wart = -0.025; }
      if (event.keyCode == 37) {  rot = "rot2"; wart = 0.025; }
      if (event.keyCode == 39) {  rot = "rot2"; wart = -0.025; }
      if (event.keyCode == 16) {  rot = "rot3"; wart = 0.025; }
      if (event.keyCode == 17) {  rot = "rot3"; wart = -0.025; }
      var a = document.getElementById(rot).getAttribute("rotation");
      var tab = a.split(" ");
      tab[3] = +tab[3] + wart;
      var newpos = tab[0] + " " + tab[1] + " " + tab[2] + " " + tab[3];
      console.log(rot);
      console.log(newpos);
      document.getElementById(rot).setAttribute("rotation",newpos);
    }
    if (keyboard=="Translate")
    {
      var a = document.getElementById('cam').getAttribute("position");
      var tab = a.split(" ");
      if (event.keyCode == 38)  {tab[2] = +tab[2] - 0.25;}
      if (event.keyCode == 40)  {tab[2] = +tab[2] + 0.25;}
      if (event.keyCode == 17)  {tab[1] = +tab[1] - 0.25;}
      if (event.keyCode == 16)  {tab[1] = +tab[1] + 0.25;}
      if (event.keyCode == 37)  {tab[0] = +tab[0] - 0.25;}
      if (event.keyCode == 39)  {tab[0] = +tab[0] + 0.25;}
      var newpos = tab[0] + " " + tab[1] + " " + tab[2];
      document.getElementById('cam').setAttribute("position",newpos);
      campos = newpos;
      //document.getElementById('rot1').setAttribute("center",newpos);
      //document.getElementById('rot2').setAttribute("center",newpos);
      //document.getElementById('rot3').setAttribute("center",newpos);
    }
  }

  function klik(obj)
  {
    wybrany = obj
    wybranyName = wybrany.getAttribute("id");
    document.getElementById('wybrany').innerHTML = "Wybrany obiekt " + wybranyName;

    var mat = wybrany.getElementsByTagName("shape")[0].getElementsByTagName("appearance")[0].getElementsByTagName("material")[0];
    var pol = mat.getAttribute('specularColor');
    var trp = mat.getAttribute('transparency');
    slider.setValue(trp);
    var tab = pol.split(" ");
    document.getElementById('kolor').color.fromRGB(tab[0],tab[1],tab[2]);
  }

  function addNode()
  {
    iloscObj++;
    var e = document.getElementById("typ");
    var strUser = e.options[e.selectedIndex].text;
    var s = document.createElement('shape');
    var b = document.createElement(strUser);
    s.appendChild(b);
    var m = document.createElement('material');
    var r = Math.random();
    var g = Math.random();
    var b = Math.random();
    m.setAttribute('specularColor',r + " " + g + " " + b);
    m.setAttribute('diffuseColor',r + " " + g + " " + b);
    //shininess='0.5'
    m.setAttribute('shininess','0.5');
    document.getElementById('kolor').color.fromRGB(r,g,b);
    var a = document.createElement('appearance');
    a.appendChild(m);
    //tex = document.createElement('ImageTexture');
    //tex.setAttribute('url','selector.gif');
    //a.appendChild(tex);
    s.appendChild(a);
    var ot = document.getElementById('root');
    var t = document.createElement('Transform');
    t.setAttribute("typ",strUser);
    t.setAttribute("translation","0 0 0");
    t.setAttribute('scale','1 1 1');
    t.setAttribute('rotation','1 0 0 0');
    t.appendChild(s);

    var t3 = document.createElement('Transform');
    var t2 = document.createElement('Transform');
    t3.setAttribute('rotation','0 1 0 0');
    t3.setAttribute("id","obj" + iloscObj);
    t3.setAttribute("onmousedown","klik(this)");
    t2.setAttribute('rotation','0 0 1 0');

    t2.appendChild(t);
    t3.appendChild(t2);
    ot.appendChild(t3);

    var boxes = document.getElementById("x3d");
    var redBox = document.getElementById("obj" + iloscObj);
    new x3dom.Moveable(boxes, redBox, null, 0);

    wybrany = redBox
    wybranyName = wybrany.getAttribute("id");
    document.getElementById('wybrany').innerHTML = "Wybrany obiekt " + wybranyName;
  };

  function addLS()
  {
    iloscObj++;
    var e = document.getElementById("typ");
    var strUser = e.options[e.selectedIndex].text;
    var s = document.createElement('shape');
    var b = document.createElement('Sphere');
    s.appendChild(b);
    var m = document.createElement('material');
    var r = Math.random();
    var g = Math.random();
    var b = Math.random();
    m.setAttribute('specularColor',r + " " + g + " " + b);
    m.setAttribute('diffuseColor',r + " " + g + " " + b);
    m.setAttribute('emissivecolor',"0 0 0");
    //shininess='0.5'
    m.setAttribute('shininess','1.0');
    document.getElementById('kolor').color.fromRGB(r,g,b);
    var a = document.createElement('appearance');
    a.appendChild(m);
    //tex = document.createElement('ImageTexture');
    //tex.setAttribute('url','selector.gif');
    //a.appendChild(tex);
    s.appendChild(a);
    var ot = document.getElementById('root');
    var t = document.createElement('Transform');
    t.setAttribute("typ",strUser);
    t.setAttribute("translation","0 0 0");
    t.setAttribute('scale','0.25 0.25 0.25');
    t.setAttribute('rotation','1 0 0 0');
    t.appendChild(s);

    var t3 = document.createElement('Transform');
    var t2 = document.createElement('Transform');

    var pl = document.createElement('PointLight');
    pl.setAttribute('color','1 1 1');
    pl.setAttribute('radius','360');
    pl.setAttribute('ambientIntensity','0.4');
    pl.setAttribute('intensity','0.7');
    t.appendChild(pl)

    t3.setAttribute('rotation','0 1 0 0');
    t3.setAttribute("id","obj" + iloscObj);
    t3.setAttribute("onmousedown","klik(this)");
    t2.setAttribute('rotation','0 0 1 0');

    t2.appendChild(t);
    t3.appendChild(t2);
    ot.appendChild(t3);

    var boxes = document.getElementById("x3d");
    var redBox = document.getElementById("obj" + iloscObj);
    new x3dom.Moveable(boxes, redBox, null, 0);

    wybrany = redBox
    wybranyName = wybrany.getAttribute("id");
    document.getElementById('wybrany').innerHTML = "Wybrany obiekt " + wybranyName;

    /*iloscObj++;
    var e = document.getElementById("typ");
    var strUser = e.options[e.selectedIndex].text;
    var s = document.createElement('shape');
    var b = document.createElement('sphere');
    s.appendChild(b);
    var m = document.createElement('material');
    var r = Math.random();
    var g = Math.random();
    var b = Math.random();
    m.setAttribute('diffuseColor',r + " " + g + " " + b);
    m.setAttribute('transparency',0);
    document.getElementById('kolor').color.fromRGB(r,g,b);
    var a = document.createElement('appearance');
    a.appendChild(m);
    //tex = document.createElement('ImageTexture');
    //tex.setAttribute('url','selector.gif');
    //a.appendChild(tex);
    s.appendChild(a);
    var ot = document.getElementById('root');
    var t = document.createElement('Transform');
    t.setAttribute("typ",strUser);
    t.setAttribute("translation","0 0 0");
    t.setAttribute('scale','0.25 0.25 0.25');
    t.setAttribute('rotation','1 0 0 0');
    t.appendChild(s);

    var t3 = document.createElement('Transform');
    var t2 = document.createElement('Transform');
    t3.setAttribute('rotation','0 1 0 0');
    t3.setAttribute("id","obj" + iloscObj);
    t3.setAttribute("onmousedown","klik(this)");
    t2.setAttribute('rotation','0 0 1 0');

    t2.appendChild(t);
    t3.appendChild(t2);
    ot.appendChild(t3);

    var boxes = document.getElementById("x3d");
    var redBox = document.getElementById("obj" + iloscObj);
    new x3dom.Moveable(boxes, redBox, null, 0);

    wybrany = redBox
    wybranyName = wybrany.getAttribute("id");
    document.getElementById('wybrany').innerHTML = "Wybrany obiekt " + wybranyName;*/
  };

  function removeNode()
  {
    var ot = document.getElementById('root');
    var t = wybrany;
    wybrany = null;
    wybranyName = null;
    document.getElementById('wybrany').innerHTML = "Nie wybrano obiektu";
    ot.removeChild(t);
  };

  function tick() 
  {
    if (move==true)
    {
      if (wybranyName!=null)
      {
        var pol = document.getElementById(wybranyName).getAttribute("translation");
        var poltav = pol.split(" ");

        if (moveDir=="prawo")
        {
          poltav[0] = +poltav[0] + 0.05;
        }
        if (moveDir=="lewo")
        {
          poltav[0] = +poltav[0] - 0.05;
        }
        if (moveDir=="gora")
        {
          poltav[1] = +poltav[1] + 0.05;
        }
        if (moveDir=="dol")
        {
          poltav[1] = +poltav[1] - 0.05;
        }
        if (moveDir=="tyl")
        {
          poltav[2] = +poltav[2] - 0.05;
        }
        if (moveDir=="przod")
        {
          poltav[2] = +poltav[2] + 0.05;
        }
        var newpol = (poltav[0]) + " " + poltav[1] + " " + poltav[2];
        document.getElementById(wybranyName).setAttribute("translation",newpol);
      }
    }

    if (resize==true)
    {
      if (wybranyName!=null)
      {
        var size = document.getElementById(wybranyName).childNodes[0].childNodes[0].getAttribute('scale');
        var sizeAxis = size.split(" ");
        if (resizeAxis=="resizeX+")
        {
          sizeAxis[0] = +sizeAxis[0] + 0.025;
        }
        if (resizeAxis=="resizeY+")
        {
          sizeAxis[1] = +sizeAxis[1] + 0.025;
        }
        if (resizeAxis=="resizeZ+")
        {
          sizeAxis[2] = +sizeAxis[2] + 0.025;
        }
        if (resizeAxis=="resizeX-")
        {
          sizeAxis[0] = +sizeAxis[0] - 0.025;
        }
        if (resizeAxis=="resizeY-")
        {
          sizeAxis[1] = +sizeAxis[1] - 0.025;
        }
        if (resizeAxis=="resizeZ-")
        {
          sizeAxis[2] = +sizeAxis[2] - 0.025;
        }
        for (var i=0;i<3;i++)
        {
          if (sizeAxis[i]<0)
          {
            sizeAxis[i] = 0;
          }
        }
        var newSize = (sizeAxis[0]) + " " + sizeAxis[1] + " " + sizeAxis[2];
        document.getElementById(wybranyName).childNodes[0].childNodes[0].setAttribute("scale",newSize);
      }
    }

    if (rotate==true)
    {
      if (wybranyName!=null)
      {
        if (rotateAxis=="rotateX+")
        {
          var size = document.getElementById(wybranyName).getAttribute('rotation');
          var sizeAxis = size.split(" ");
          sizeAxis[3] = +sizeAxis[3] + 0.025;
          var newSize = (sizeAxis[0]) + " " + sizeAxis[1] + " " + sizeAxis[2] + " " + sizeAxis[3];
          document.getElementById(wybranyName).setAttribute("rotation",newSize);
        }
        if (rotateAxis=="rotateX-")
        {
          var size = document.getElementById(wybranyName).getAttribute('rotation');
          var sizeAxis = size.split(" ");
          sizeAxis[3] = +sizeAxis[3] - 0.025;
          var newSize = (sizeAxis[0]) + " " + sizeAxis[1] + " " + sizeAxis[2] + " " + sizeAxis[3];
          document.getElementById(wybranyName).setAttribute("rotation",newSize);
        }
        if (rotateAxis=="rotateY+")
        {
          var size = document.getElementById(wybranyName).childNodes[0].getAttribute('rotation');
          var sizeAxis = size.split(" ");
          sizeAxis[3] = +sizeAxis[3] + 0.025;
          var newSize = (sizeAxis[0]) + " " + sizeAxis[1] + " " + sizeAxis[2] + " " + sizeAxis[3];
          document.getElementById(wybranyName).childNodes[0].setAttribute("rotation",newSize);
        }
        if (rotateAxis=="rotateY-")
        {
          var size = document.getElementById(wybranyName).childNodes[0].getAttribute('rotation');
          var sizeAxis = size.split(" ");
          sizeAxis[3] = +sizeAxis[3] - 0.025;
          var newSize = (sizeAxis[0]) + " " + sizeAxis[1] + " " + sizeAxis[2] + " " + sizeAxis[3];
          document.getElementById(wybranyName).childNodes[0].setAttribute("rotation",newSize);
        }
        if (rotateAxis=="rotateZ+")
        {
          var size = document.getElementById(wybranyName).childNodes[0].childNodes[0].getAttribute('rotation');
          var sizeAxis = size.split(" ");
          sizeAxis[3] = +sizeAxis[3] + 0.025;
          var newSize = (sizeAxis[0]) + " " + sizeAxis[1] + " " + sizeAxis[2] + " " + sizeAxis[3];
          document.getElementById(wybranyName).childNodes[0].childNodes[0].setAttribute("rotation",newSize);
        }
        if (rotateAxis=="rotateZ-")
        {
          var size = document.getElementById(wybranyName).childNodes[0].childNodes[0].getAttribute('rotation');
          var sizeAxis = size.split(" ");
          sizeAxis[3] = +sizeAxis[3] - 0.025;
          var newSize = (sizeAxis[0]) + " " + sizeAxis[1] + " " + sizeAxis[2] + " " + sizeAxis[3];
          document.getElementById(wybranyName).childNodes[0].childNodes[0].setAttribute("rotation",newSize);
        }
      }
    }
  }

  function omd(obj)
  {
    move = true;
    var name = obj.getAttribute("name");
    if (name=="lewo")
    {
      moveDir = "lewo";
    }
    if (name=="prawo")
    {
      moveDir = "prawo";
    }
    if (name=="gora")
    {
      moveDir = "gora";
    }
    if (name=="dol")
    {
      moveDir = "dol";
    }
    if (name=="tyl")
    {
      moveDir = "tyl";
    }
    if (name=="przod")
    {
      moveDir = "przod";
    }
  };

  function omu(obj)
  {
    move = false;
    moveDir = null;
  };

  var resize = false;
  var resizeAxis = null;

  function resizeMD(obj)
  {
    resize = true;
    var name = obj.getAttribute("name");
    resizeAxis = name;
    console.log(resizeAxis);
  }

  function resizeMU(obj)
  {
    resize = false;
  }

  var rotate = false;
  var rotateAxis = null;

  function rotateMD(obj)
  {
    rotate = true;
    var name = obj.getAttribute("name");
    rotateAxis = name;
  }

  function rotateMU(obj)
  {
    rotate = false;
  }

  function updateCol(obj)
  {
    var mat = wybrany.getElementsByTagName("shape")[0].getElementsByTagName("appearance")[0].getElementsByTagName("material")[0];
    mat.setAttribute('specularColor',obj.rgb[0] + " " + obj.rgb[1] + " " + obj.rgb[2]);
    mat.setAttribute('diffuseColor',obj.rgb[0] + " " + obj.rgb[1] + " " + obj.rgb[2]);
  }

  function handler(pos, slider) 
  {
    console.log("update")
    if (wybranyName!=null)
    {
      var mat = wybrany.getElementsByTagName("shape")[0].getElementsByTagName("appearance")[0].getElementsByTagName("material")[0].setAttribute('transparency',pos);

      var ot = document.getElementById('root');
      var t = wybrany;
      wybrany = null;
      document.getElementById('wybrany').innerHTML = "Nie wybrano obiektu";
      ot.removeChild(t);
      ot.appendChild(t);
      wybrany = t;
      var boxes = document.getElementById("x3d");
      var redBox = document.getElementById(wybranyName);
      new x3dom.Moveable(boxes, redBox, null, 0);
    }
  }

  function cameraLight(obj)
  {
    //id="ni" headlight='true'
    if (obj.value=="CameraLight OFF")
    {
      console.log('test');
      document.getElementById('lightbtn').value = "CameraLight ON";
      document.getElementById('light').setAttribute('intensity','0.0');
      document.getElementById('light').setAttribute('ambientIntensity','0.0');
      document.getElementById('light').setAttribute('shadowIntensity','0.0');
      document.getElementById('light').setAttribute('shadowOffset','0.0');
      document.getElementById('light').setAttribute('shadowFilterSize','0.0');
    }
    else
    {
      document.getElementById('lightbtn').value = "CameraLight OFF";
      document.getElementById('light').setAttribute('intensity','1.0');
      document.getElementById('light').setAttribute('ambientIntensity','1.0');
      document.getElementById('light').setAttribute('shadowIntensity','0.8');
      document.getElementById('light').setAttribute('shadowOffset','0.7');
      document.getElementById('light').setAttribute('shadowFilterSize','2');
    }
  }

  var slider = new dhtmlxSlider(null,400,null,null,0,1,0,0.01);
  slider.attachEvent("onChange", handler);
  slider.init();

  document.onload = function() 
  {
    setInterval(function() {tick();}, 25);
  };

