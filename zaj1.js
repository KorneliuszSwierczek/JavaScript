function przelicz() {
    
    var liczba1 = parseFloat(document.getElementById('liczba1').value) || 0;
    var liczba2 = parseFloat(document.getElementById('liczba2').value) || 0;
    var liczba3 = parseFloat(document.getElementById('liczba3').value) || 0;
    var liczba4 = parseFloat(document.getElementById('liczba4').value) || 0;
  
    var srednia = (liczba1 + liczba2 + liczba3 + liczba4) / 4;
    var minimum = Math.min(liczba1, liczba2, liczba3, liczba4);
    var maximum = Math.max(liczba1, liczba2, liczba3, liczba4);
  
    // document.getElementById('wyniki').innerHTML = "Średnia: " + srednia.toFixed(2) + "<br>Minimum: " + minimum + "<br>Maximum: " + maximum;
    var wyniki = "Średnia: " + srednia.toFixed(2) + "<br>Minimum: " + minimum + "<br>Maximum: " + maximum;
    document.getElementById('wyniki').innerHTML = wyniki;
  }
  