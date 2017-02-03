﻿/*
 * Addon Reports Script
 * Author: GreatApo, DarkThanos
 * Copyright: all rights reserved
 */

var gca_section_reports = {
	inject : function(){
		if(gca_section.submod=='showCombatReport'){
			(gca_options.isOn("ENABLE_PLAYER_IMAGE") &&
			this.player_images_in_reports());
			
			// Expeditions
			if( getPage.url().match("t=0") ){
				this.reportFoundItems();
			}
		}else{
			//Check if there is content
			if($dark('#content .title_inner[1]') && $dark('#content .title_inner[1] table[0]')){
				if( !getPage.url().match(/(showExpeditions|showDungeons|t=-1)/) ){
					//Save attack time
					this.save_attacks_time();
				}
				//New Style
				if(gca_options.isOn("ENABLE_REPORT_LIST_STYLE"))
					this.reports_style();
			}
		}
		
		//Show attacked timers (not running on reports, so we run it)
		(gca_options.isOn("ENABLE_GLOBAL_ATTACKED_TIMERS") &&
			gca_section_global.display.attacked_timers());
	},
	reportFoundItems : function(){
		// New report?
			var date = $dark('#header_game span[6]').html().match(/(\d+).(\d+).(\d+) (\d+).(\d+)/i);
			var now = new Date();
			date=date[2]+"/"+date[1]+"/"+date[3]+' '+date[4]+":"+now.getMinutes()+":"+now.getSeconds();
			var reportDate = $dark('#content .title_inner[1]').html().match(/(\d+).(\d+).(\d+) (\d+).(\d+).(\d+)/i);
			reportDate=reportDate[2]+"/"+reportDate[1]+"/"+reportDate[3]+' '+reportDate[4]+":"+reportDate[5]+":"+reportDate[6];
			var timePassed = (new Date(date).getTime() - new Date(reportDate).getTime())/ 1000;// to sec
			_alert("You attacked before: "+timePassed+" sec");
			
			if( timePassed>10 )
				return;
		
		// Reward exist?
		if($dark('.reportReward[0]') && $dark('.reportReward[0]')){
			var data = gca_data.get('collectorData', "");
			
			var i=0;
			while( $dark('.reportReward['+i+']') ){
				// Smelt Items
				if( $dark('.reportReward['+i+'] img[0]').src().match(/img\/item\/18_\d+\.gif/) ){
					var item = '18_'+$dark('.reportReward['+i+'] img[0]').src().match(/img\/item\/18_(\d+)\.gif/)[1];
					var enemy = $dark('#defenderAvatar11').html().match(/\/img\/npc\/(\d+)\/(\d+)_(\d+)\.jpg/);
					enemy = enemy[1]+"/"+enemy[2]+"_"+enemy[3];
					//_alert(item+" "+enemy);
					gca_data.set('collectorData', data+',["'+enemy+'","'+item+'"]');
				}
			i++;
			}
		}
	},
	player_images_in_reports : function(){
		if($dark('.dungeon_report_statistic[0] a[0]')){//Fight with mercenaries
			var player_url=[
				$dark('.dungeon_report_statistic[0] a[0]').href(),
				($dark('.dungeon_report_statistic[0] a[1]'))?$dark('.dungeon_report_statistic[0] a[1]').href():null
			];
		}else{//Normal Fights
			var player_url=[null,null];
			var player_name=[null,null];
			var links_found=0;
			var i=0;
			while(links_found<2 && $dark('#content fieldset[0] a['+i+']')){
				
			console.log($dark('#content fieldset[0] a['+i+']').html());
				if($dark('#content fieldset[0] a['+i+']').href().match(/p=\d+/) ){ //&& !$dark('#content a['+i+']').href().match('submod=achievements')
					if(links_found==1 && player_url[0]!=$dark('#content a['+i+']').href()){
						player_url[1]=$dark('#content fieldset[0] a['+i+']').href();
						player_name[1]=$dark('#content fieldset[0] a['+i+']').html();
						links_found++;
					}else if(links_found<1){
						player_url[0]=$dark('#content fieldset[0] a['+i+']').href();
						player_name[0]=$dark('#content fieldset[0] a['+i+']').html();
						links_found++;
					}
				}
				i++;
			}
		}
		/*
		if(player_name!=null){
			if(!player_name[0].match( $dark('#attackerAvatar1 div[1]').html() )){
				var temp=player_url[0];
				player_url[0]=player_url[1];
				player_url[1]=temp;
			}
		}*/
		
		for(var i=0;i<2;i++){
			if(player_url[i]!=null){
				new (function(){
					var _i=i;
					xmlHttpRequest({
						url : player_url[i],
						method : "GET",
						onload : function(content){
							if(content.match(/##GTI=([^#]+)##/)){
								var playerImage=content.match(/##GTI=([^#]+)##/)[1];
								gca_section_player.player_image( playerImage,(_i+1) );
							}
						}
					});
				})();
			}
		}
	},
	//Save attack time
	save_attacks_time : function(){
		if(getPage.url().match(/(showCircusTurma|t=3)/)){
			var group='group';
		}else{
			var group='';
		}
		var length=$dark('.report_statistic[0] tr').length;
		var found=[false,false];
		for(i=1;i<=length;i++){
			if($dark('.report_statistic[0] tr['+i+'] td[1]')){
				if($dark('.report_statistic[0] tr['+i+'] .icon_defense[0]')){
					if($dark('.report_statistic[0] tr['+i+'] td[1] a[0]').html().match(/\(\d+\)/)){
						if(!found[0]){
							//Cross Server Fights
							var date=$dark('.report_statistic[0] tr['+i+'] td[0]').html().match(/(\d+)\.(\d+)\.(\d+) (\d+):(\d+):(\d+)/);
							date = new Date(date[3], date[2]-1, date[1], date[4], date[5], date[6], 0).getTime();
							//Save
							gca_data.set(group+'arena_xs_attacked_time', date);
							//console.log(group+'arena_xs_attacked_time', date, new Date(date));
							//Stop if both Arena Type Fights are saved
							found[0]=true;
							if(found[1])
								break;
						}
					}else{
						if(!found[1]){
							//Normal Server Fights
							var date=$dark('.report_statistic[0] tr['+i+'] td[0]').html().match(/(\d+)\.(\d+)\.(\d+) (\d+):(\d+):(\d+)/);
							date = new Date(date[3], date[2]-1, date[1], date[4], date[5], date[6], 0).getTime();
							//Save
							gca_data.set(group+'arena_attacked_time', date);
							//console.log(group+'arena_attacked_time', date, new Date(date));
							//Stop if both Arena Type Fights are saved
							found[1]=true;
							if(found[0])
								break;
						}
					}
				}
			}
		}
		
		//Run the timers
		gca_section_global.display.attacked_timers();
	},
	//New Style
	reports_style : function(){
		/*
		// Fix style bug
		if($dark('#content tr[0]').element){
			if($dark('#content tr[0] th[2]').element)
				$dark('#content tr[0] th[2]').attr('colspan','2');
			//Fix description width
			if($dark('#content tr[0] th[1]').element)
				$dark('#content tr[0] th[1]').css('width: 276px;');
		}
		
		//Style it!
		var report_id = null;
		var report_t = null;
		var report_date = null;
		var row = 0;
		// For every row
		while($dark('#content tr['+row+']')){
			if($dark('#content tr['+row+'] td[0]')){
				if(report_date != $dark('#content tr['+row+'] td[0]').html().match(/(\d+\.\d+\.\d+) /i)[1]){
					report_date = $dark('#content tr['+row+'] td[0]').html().match(/(\d+\.\d+\.\d+) /i)[1];
					$dark('*tr').class('reports_day_row').html('<td>'+report_date+'</td><td></td><td></td><td></td><td></td>').beforeFrom($dark('#content tr['+row+']'));
				}else{
					$dark('#content tr['+row+'] td[0]').style('').html($dark('#content tr['+row+'] td[0]').html().replace(report_date+' ',''));
					$dark('#content tr['+row+'] td[2]').style('text-align:right;');
					// If report has a reward
					if($dark('#content tr['+row+'] td[3] img[0]')){
						// Get report id
						report_id = $dark('#content tr['+row+'] td[4] a[0]').attr('href').match(/reportId=(\d+)&/i)[1];
						// Get report t parm
						report_t = $dark('#content tr['+row+'] td[4] a[0]').attr('href').match(/t=(\d+)&/i)[1];
						// Set a loading tooltip
						$dark('#content tr['+row+'] td[3] img[0]').id('report_reward_item_'+report_id).style('cursor:pointer;').attr('onmouseover',"return escape('<table cellspacing=2 cellpadding=2 valign=middle class=\\'tooltipBox\\'><tr><td style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'><div class=\"loading\"/></div></td></tr></table>')");
						// Get item info
						gca_section_reports.find_the_item(report_id, report_t, row);
					}
				}
			}
			row++;
		}
		*/
		// Load loot tooltips
		var load_loot = true;

		// Date variable
		var last_date = null;

		// Report lines
		var row = 1;
		var line = document.getElementById('content').getElementsByTagName('tr');

		// Align stuff
		line[0].getElementsByTagName('th')[2].style.textAlign = "right";

		// For every row
		while(line[row]){
			// If a td exist
			if(line[row].getElementsByTagName('td').length > 0){
				// Get date
				let date = line[row].getElementsByTagName('td')[0].textContent.match(/(\d+\.\d+\.\d+)/i)[1];
				// If this is a new line
				if(last_date != date){
					last_date = date;
					// Insert a new line
					let tr = document.createElement("tr");
					tr.className = "reports_day_row";
					let td = document.createElement("td");
					td.textContent = last_date;
					td.setAttribute('colspan', line[row].getElementsByTagName('td').length);
					tr.appendChild(td);
					line[row].parentNode.insertBefore(tr, line[row]);
				}
				else{
					// Remove style
					line[row].getElementsByTagName('td')[0].removeAttribute('style');
					// Leave only time
					line[row].getElementsByTagName('td')[0].textContent = line[row].getElementsByTagName('td')[0].textContent.match(/(\d+:\d+:*\d*)/i)[1];
					// Align Loot
					line[row].getElementsByTagName('td')[2].style.textAlign = "right";

					// If report has a reward
					if(line[row].getElementsByTagName('td')[3].getElementsByTagName('div').length > 0){
						// Get report id
						let report_id = line[row].getElementsByTagName('td')[4].getElementsByTagName('a')[0].href.match(/reportId=(\d+)&/i)[1];
						// Get report t parm
						let report_t = line[row].getElementsByTagName('td')[4].getElementsByTagName('a')[0].href.match(/t=(\d+)&/i)[1];
						// Load Loot
						if(load_loot){
							// Set a loading tooltip
							let img = line[row].getElementsByTagName('td')[3].getElementsByTagName('div')[0];
							img.id = 'report_reward_item_' + report_id;
							let title = img.getAttribute('title');
							img.removeAttribute('title');
							img.style.cursor = "pointer";

							// Add id to img
							img.id = "image_report_" + report_id;

							tooltip = [[[title+'<span class="loading"></span>',"white"]]];
							//gca_tools.setTooltip(img, JSON.stringify([[[title+'<span class="loading"></span>',"white"]]]));
							var script_code = "(function (){\n" + 
							"var data = JSON.stringify(" + JSON.stringify(tooltip) + ");\n" +
							"var img = jQuery('#image_report_" + report_id + "')[0];\n" + 
							"img.dataset.tooltip = data.tooltip;\n" + 
							"if(typeof setTooltip != 'undefined'){setTooltip(img, data);}\n" +
							"})();";


							// Load item
							this.getLootItem(report_id, report_t, img, title);
						}
					}
				}
			}
			row++;
		}
	},

	// Get loot item
	getLootItem : function(id, t, img, title){
		// Get Report
		xmlHttpRequest({
			url : getPage.link({"mod":"reports","submod":"showCombatReport","t":t,"reportId":id}),
			method : "GET",
			onload : function(content){

				// Match Loot
				var tooltip = content.match(/<div\s+style="background-image:url\(\d*\/*img\/shop\/shop_zelle\.gif\);\s*width:\d+px;\s*height:\s*\d+p*x*;float:left;"\s*data-tooltip="([^"]+)">/im);
				if(!tooltip){
					// Match alternative loot
					tooltip = content.match(/<div\s+class="reportReward"\s+data-tooltip="([^"]+)">/im);
				}

				
				
				// Error
				if(!tooltip){
					tooltip = [[[title, "white"], [gca_locale.get("error"), "white"]]];
				}
				// Tooltip replace
				else{
					tooltip = JSON.parse(tooltip[1].replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
					tooltip[0].unshift(['Rescripted for v4.0.0',"red"])
					tooltip[0].unshift([title, "white"]);
				}

				var script_code = "(function (){\n" + 
				"var data = JSON.stringify(" + JSON.stringify(tooltip) + ");\n" +
				"var img = jQuery('#image_report_" + id + "')[0];\n" + 
				"img.dataset.tooltip = data.tooltip\n" + 
				"if(typeof setTooltip != 'undefined'){setTooltip(img, data);}\n" +
				"})();";

				var script = document.createElement('script');
				script.innerHTML = script_code;
				document.body.appendChild(script);
			}
		});
	},

	//Find the items you won and make tooltips
	find_the_item : function(id,t,row){
		var temp_onmouseover=null;
		xmlHttpRequest({
			url : getPage.link({"mod":"reports","submod":"showCombatReport","t":t,"reportId":id}),
			method : "GET",
			onload : function(content){
				var doc = $dark('*div').html(content).element;
				if(doc.getElementsByClassName("reportReward")[0]){
					var temp_onmouseover=doc.getElementsByClassName("reportReward")[0].getElementsByTagName("div")[0].getAttribute('onmouseover');
				}else if(doc.getElementsByClassName("reportReward_itemsOnly")[0]){
					var temp_onmouseover=doc.getElementsByClassName("reportReward_itemsOnly")[0].getAttribute('onmouseover');
				}else{
					var temp_onmouseover="return escape('<table cellspacing=2 cellpadding=2 valign=middle class=\\'tooltipBox\\'><tr><td style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'>"+gca_locale.get("error")+"</td></tr></table>')";
				}
				if($dark('#tOoLtIp_report_reward_item_'+id)){
					$dark('#tOoLtIp_report_reward_item_'+id+' table[1] td[0]').html(temp_onmouseover.substring(15, temp_onmouseover.length-15-2).replace(/\\'/g,"'"));
				}else{
					$dark('#content tr['+row+'] td[3] img[0]').attr('onmouseover',temp_onmouseover);
				}
			}
		});
	}
}