(function(){
	var root = this,
		Chart = root.Chart,
		helpers = Chart.helpers;

	Chart.Type.extend({
		name: "MultiLevelPie",
		defaults: {
			//Boolean - Whether we should show a stroke on each segment
			segmentShowStroke : false,

			//String - The colour of each segment stroke
			segmentStrokeColor : "#fff",

			//Number - The width of each segment stroke
			segmentStrokeWidth : 0,

			// Number - Start angle in radians
			startAngle: Math.PI * 1.5

		},

		initialize: function(data){

			this.SegmentArc = Chart.Arc.extend({
				ctx : this.chart.ctx,
				x : this.chart.width/2,
				y : this.chart.height/2
			});

			this.calculateTotal(data);

			this.segments = [];

			helpers.each(data, function(segment){


				// TODO - calculate inner/outer radius based on recursion index

				var outerRadius = 50,
					innerRadius = 0;

				this.segments.push(new this.SegmentArc({
					value : 700,
					outerRadius : outerRadius,
					innerRadius : innerRadius,
					fillColor : segment.color,
					highlightColor : segment.highlight || segment.color,
					showStroke : this.options.segmentShowStroke,
					strokeWidth : this.options.segmentStrokeWidth,
					strokeColor : this.options.segmentStrokeColor,
					startAngle : this.options.startAngle,
					circumference : (this.options.animation) ? 0 : this.calculateCircumference(segment.value),
					label : segment.label
				}))
			}, this);


			this.render();

		},
		calculateCircumference: function(value){
			return (value / this.total) * (Math.PI * 2);
		},
		calculateTotal : function(data){
			this.total = 0;
			helpers.each(data, function(segment){
				this.total += segment.value;
			},this);
		},

		draw: function(easeDecimal){

			var animDecimal = (easeDecimal) ? easeDecimal : 1;

			this.clear();

			helpers.each(this.segments, function(segment){
				segment.transition({
					circumference : this.calculateCircumference(segment.value)
				}, animDecimal);

				segment.endAngle = segment.startAngle + segment.circumference;

				segment.draw(animDecimal);
			}, this);

		}
	});

}).call(this);
