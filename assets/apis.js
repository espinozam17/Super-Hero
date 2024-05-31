$(document).ready(function () {
    $("form").submit(function (event) {
      event.preventDefault();
      let input = $("#heroInput").val();
      $.ajax({
        type: "GET",
        url: "https://superheroapi.com/api.php/3033707663582647/" + input,
        dataType: "json",
        success: function (data) {
          console.log(data);
  
          // Verificar que las propiedades existen antes de usarlas
          let connections =
          check(data.connections["group-affiliation"], "personal") ;
          let publisher = check(data.biography.publisher, "personal");
          let occupation = check(data.work.occupation, "personal") ;
          let firstAppearance =
          check(data.biography["first-appearance"], "personal") ;
          let height = check(data.appearance.height.join(", "), "personal") ;
          let weight = check(data.appearance.weight.join(", "), "personal") ;
          let aliases = check(data.biography.aliases.join(", "), "personal") ;
  
          $("#heroInfo").html(`
                      <div class="row">
                          <div class="col-md-4 my-auto text-center">
                              <img id="heroImg" src="${check(data.image.url, "img")}" height="350px" alt="${data.name}" />
                          </div>
                          <div class="col-md-4">
                              <div class="card-body">
                                  <h5 class="card-text"><b>NOMBRE:</b></h5>
                                  <h4 class="card-title"><b>${data.name}</b></h4>
                                  <p class="card-text"><b>CONEXIONES:</b> ${connections}</p>
                                  <p class="card-text"><b>FECHA DE PUBLICACION:</b> ${publisher}</p>
                                  <p class="card-text"><b>OCUPACION:</b> ${occupation}</p>
                                  <p class="card-text"><b>PRIMERA APARICION:</b> ${firstAppearance}</p>
                                  <p class="card-text"><b>ALTURA:</b> ${height}</p>
                                  <p class="card-text"><b>PESO:</b> ${weight}</p>
                                  <p class="card-text"><b>ALIAS:</b> ${aliases}</p>
                              </div>
                          </div>
                          <div class="col-md-4">
                              <div id="heroStats" style="height: 360px; width: 100%"></div>
                          </div>
                      </div>
                  `);
  
          // Generar gráfico de estadísticas
          const estadisticas = [
          { y: check(data.powerstats.intelligence, null), label: "Inteligencia" },
          { y: check(data.powerstats.strength, null), label: "Fuerza" },
          { y: check(data.powerstats.speed, null), label: "Velocidad" },
          { y: check(data.powerstats.durability, null), label: "Resistencia" },
          { y: check(data.powerstats.power, null), label: "Poder" },
          { y: check(data.powerstats.combat, null), label: "Combate" },
          ];
  
          const config = {
            theme: "light1",
            animationEnabled: true,
            title: {
              text: "Estadísticas de Poder para " + data.name,
            },
            data: [
              {
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: true,
                legendText: "{label} - {y}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: estadisticas,
              },
            ],
          };
  
          let chart = new CanvasJS.Chart("heroStats", config);
          chart.render();
        },
        error: function (error) {
          console.error("Ocurrió un error:", error);
        },
      });
    });
  });
  
  function check (dato,type){
      if (type === "personal"){
          return dato.startsWith("-") ? "No disponible" : dato ; 
      } else if (type === "img"){ return dato === "https://www.superherodb.com/pictures2/portraits/10/100/1010.jpg"  ? "https://static.zerochan.net/Asta.%28Black.Clover%29.full.3008401.jpg" : dato ;
          
      
      }
      else {return dato === "null"  ? Math.ceil(Math.random() * 100) : dato ; }
      };
  
  