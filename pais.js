     var resource = 'https://raw.githubusercontent.com/63anp3ca/HomeWork3/master/2018-2.json';

     var format = d3.time.format("%Y-%m-%d"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

    var force = d3.layout.force()
          .gravity(0.1)
          .charge(function(d, i) { return d.amount * -.2; })
          .size([width, height]);

    var color = d3.scale.category10();

    var svg = d3.select("body")
                .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(resource, function(error, data) {
      console.log(data)
      data.forEach(function(d) {
        d.pais = d.PAIS;
        d.femenino = d.FEMENINO;
        d.masculino = d.MASCULINO;
        d.amount = parseInt(d.TOTAL);
        console.log("Spent $" + d.amount + " on " + d.pais);
      });

      force
        .nodes(data)
        .start();

      var node = svg.selectAll("g.node")
          .data(data)
          .enter()
          .append("g")
            .attr("class", "node")
            .call(force.drag);

      node.append("circle")
            .attr("r", function(d) { return d.amount * .019 })
            .attr("opacity", .67)
            .attr("fill", function(d){
              if (d.amount <= 1000) {
                return "#a6cee3"  // Green
              } else if (d.amount > 1000 && d.amount <= 2000) {
                return "#1f78b4"  // Yellow
              } else if (d.amount > 2000 && d.amount <= 3000) {
                return "#b2df8a"  // Orange
              } else if (d.amount > 3000 && d.amount <= 4000) {
                return "#33a02c"  // Orange
              } else if (d.amount > 4000 && d.amount <= 5000) {
                return "#fb9a99"  // Orange
              } else if (d.amount > 5000 && d.amount <= 6000) {
                return "#e31a1c"  // Orange
              } else if (d.amount > 6000 && d.amount <= 7000) {
                return "#fdbf6f"  // Orange
              } else if (d.amount > 7000 && d.amount <= 8000) {
                return "#ff7f00"  // Orange
              } else if (d.amount > 8000 && d.amount <= 9000) {
                return "#6a3d9a"  // Orange
              } else {
                return "#cab2d6"  // Red
              }
            });

      //  textos interno ciculo
      node.append("text")
            .text(function(d){ return d.pais; })
            .attr('fill', '#252525')
            .attr('font-size', 12)
            .attr('dx', -16)
            .attr('dy', -5);
      //  textos interno ciculo
      node.append("text")
            .text(function(d){ return  d.amount; })
            .attr('font-size', 10)
            .attr('fill', '#ffffff')
            .attr('dx', -16)
            .attr('dy', 10);

      // texto pista
      node.append("title")
            .text(function(d) { return d.pais + ":" + d.amount + "\n" +"Femenino:" + d.femenino + "\n" +"Masculino:" + d.masculino; });

      force.on("tick", function() {
        node
          .attr('transform', function(d) { return 'translate('+ Math.max(20, Math.min(width-20, d.x)) + ',' + Math.max(20, Math.min(height-20, d.y)) + ')'; });
      });


    })