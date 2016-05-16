/**
 * 自滚动表格
 * author: ninjia,water.jj@gmail.com
 */
var $ = require('jquery');
var _ = require('lodash');

function AutoRollTable($container, options, data) {
	var rowIndex = 0;
	var self = this;
	var opt = {
		timeInterval: 3000,
		rollingSpeed: 600
	};

	_.merge(opt, options);

	//Render table
	_.each(data, function(o){
		var tds = '';
		for(var key in o) {
			tds += '<td>'+o[key]+'</td>';
		}
		$container.find('tbody').append('<tr>'
			+ tds
			+ '</tr>');
	})

	//start the interval
	opt.intId = setInterval(function() {
		palyTable();
	}, opt.timeInterval);

	function palyTable() {
		// var opt = this.options;
		var $tbody = $container.find('tbody');
		var tableRowLength = $container.find('tbody > tr').length;
		var tHeahHeight = $container.find('thead > tr').height() + 36;
		var $row = $container.find('tbody > tr').removeClass('active').eq(rowIndex).addClass('active');
		//Animate
		$tbody.animate({scrollTop: $row.offset().top - $container.offset().top + $container.scrollTop() - tHeahHeight}, opt.rollingSpeed);
		//Monitoring row index
		if(rowIndex === tableRowLength-1){
			rowIndex = 0;
		} else {
			rowIndex++;
		}
	}
}

module.exports = AutoRollTable;