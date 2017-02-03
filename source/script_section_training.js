﻿/*
 * Addon Training Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_section_training = {
	inject : function(){
		if((gca_section.submod==null || gca_section.submod=="train") && $dark('#char_f0')){
			//if(gca_section.submod=="train")
			//	this.data.update();
			
			// Run training points inject info
			//(gca_options.isOn("ENABLE_TRANING_DISPLAY_MOD") && 
			//this.display.extened_training_info.run());
			
			(gca_options.isOn("ENABLE_TRANING_DISPLAY_COST_CALCULATOR") && 
			this.display.training_cost_calculator.run());
		}
	},
	display : {
		// Use every data on the right way
		extened_training_info : {
			// Stats ids
			object : {
				strength : "char_f0",
				skill : "char_f1",
				agility : "char_f2",
				constitution : "char_f3",
				charisma : "char_f4",
				intelligence : "char_f5"
			},
			// Stats coeff
			coeff : {
				strength : 2.6,
				skill : 2.5,
				agility : 2.3,
				constitution : 2.3,
				charisma : 2.5,
				intelligence : 2.4
			},
			// Run code
			run : function(){
				// Get analized data
				this.analized_data = gca_data.get('player_attributes_points', false);
				// If we have the data
				if(this.analized_data){
					this.analized();
					return;
				}
				// No data or not valid data
				delete this.analized_data;
				
				this.unanalized();
			},
			analized : function(){
				var strength_gold = parseInt($dark('#training_box .training_costs[0]').html().replace(/(\.|<.+)/g,''));
				var original_strength_gold = Math.round(Math.pow( parseInt($dark('#char_f0 div[0]').html())-4 , 2.6 ));
				
				var isOdd = function(num) {return num % 2;}
				
				var discount = 100 - Math.round(((strength_gold/original_strength_gold)*100));
				var neptunes_costume = isOdd(discount)?true:false;
				var guild_discount = (neptunes_costume)?(discount-3):discount;
				var guild_discount_text = (neptunes_costume)?(''+guild_discount+'% +3%'):(''+guild_discount+'%');
				
				var reduction_1= 1 - discount/100;
				
				for(var i in this.object){
					// Set new points
					var newpoints = parseInt( $dark('#'+this.object[i]+'_tt').getAttr('onmouseover').match(/\d+<\/td><\/tr>/g)[1] )+1;
					// Get points from items
					var itempoints = parseInt( $dark('#'+this.object[i]+' div[2]').html() );
					if(itempoints<0){
						$dark('#'+this.object[i]+' div[1]').html( '-' );
						$dark('#'+this.object[i]+' div[2]').html(-itempoints);
						var color='red';
					}else{
						var color='green';
					}
					// Get max points and calculate max points after upgrade
					var max = parseInt( $dark('#'+this.object[i]+'_tt').getAttr('onmouseover').match(/\d+<\/td><\/tr>/g)[2] );
					var max_change = 1+(newpoints-1)%2;
					//Show Max
					$dark('#'+this.object[i]+' div[3]').html( '/' ).afterFrom( $dark('#'+this.object[i]+' div[6]') );
					$dark('#'+this.object[i]+' div[3]').style('color:#666;').html( max ).afterFrom( $dark('#'+this.object[i]+' div[6]') );
					
					// Item points change
					var maxitempoints = this.analized_data[i].points;
					for(var j=0;j<this.analized_data[i].percentArray.length;j++)
						maxitempoints += Math.round((this.analized_data[i].percentArray[j]*newpoints)/100);
					
					if(maxitempoints-itempoints>=max_change-1){
						var itempoints_change=max_change-1;
					}else{
						var itempoints_change=0;
					}
					
					// Total Change
					var total=parseInt( $dark('#'+this.object[i]+' div[4]').html() );
					var total_change=1+itempoints_change;
					
					$dark('#'+this.object[i]).addClass('gca-training-info');
					$dark('#'+this.object[i]+' div[0]').addClass('gca-training-value').addChild( $dark('*sup').class("gca-training-green").html("+1") );
					$dark('#'+this.object[i]+' div[2]').addClass('gca-training-value').addChild( $dark('*sup').class("gca-training-"+color).html("+"+itempoints_change) );
					$dark('#'+this.object[i]+' div[4]').addClass('gca-training-value').addChild( $dark('*sup').class("gca-training-green").html("+"+total_change) );
					$dark('#'+this.object[i]+' div[6]').addClass('gca-training-value').addChild( $dark('*sup').class("gca-training-green").html("+"+max_change) );
					
					$dark('*div').class('gca-training-discount').addChild(
						$dark('*div').class('guild-flag icon').tooltip([
							gca_locale.get('guild_discount')+" : ",
							subFuncts.strings.insertDots(Math.round(Math.pow(parseInt($dark('#'+this.object[i]+' div[0]').html())-4,this.coeff[i])*(1 - reduction_1)))+" <img src=\"img/ui/icon_gold.gif\" align=\"absmiddle\">"+" ("+guild_discount_text+")"])
					).afterFrom('#'+this.object[i]+'_tt');
					
					var onmouseover=$dark('#'+this.object[i]+'_tt').getAttr('onmouseover').replace(/\d+<\/td><\/tr>/i,(total+total_change)+" </td></tr>").replace(/\+*-*\d+<\/td><\/tr>/i,newpoints+" </td></tr>").replace(/\+*-*\d+<\/td><\/tr>/i,max+max_change+" </td></tr>").replace(/\+*-*\d+(\s+[^\s]+\s+)\+*-*\d+<\/td><\/tr>/i,itempoints+itempoints_change+"$1"+maxitempoints+" </td></tr>").replace("<tr>","<tr><td style=\\\"color:#00B712; font-weight: bold; font-size:10pt\\\" colspan=\\\"2\\\" nowrap=\\\"nowrap\\\">"+$dark('#mainnav a[0]').text()+"</td></tr><tr>");
					if($dark('img[1]', $dark('#'+this.object[i]+'_tt').parent() ))
						$dark('img[1]', $dark('#'+this.object[i]+'_tt').parent() ).setAttr('onmouseover',onmouseover);
					else
						$dark('a[0]', $dark('#'+this.object[i]+'_tt').parent() ).setAttr('onmouseover',onmouseover);
				}
				
			},
			unanalized : function(){
				var strength_gold = parseInt($dark('#training_box .training_costs[0]').html().replace(/(\.|<.+)/g,''));
				var original_strength_gold = Math.round(Math.pow( parseInt($dark('#char_f0 div[0]').html())-4 , 2.6 ));
				
				var isOdd = function(num) {return num % 2;}
				var discount = 100 - Math.round(((strength_gold/original_strength_gold)*100));
				var neptunes_costume = isOdd(discount)?true:false;
				var guild_discount = (neptunes_costume)?(discount-3):discount;
				var guild_discount_text = (neptunes_costume)?(''+guild_discount+'% +3%'):(''+guild_discount+'%');
				
				var reduction_1= 1 - discount/100;
				
				$dark('*font').class('values_may_be_wrong_on_training').html('* these values may be wrong').afterFrom( $dark('.buildingDesc[0]') );
				
				for(var i in this.object){
					// Set new points
					var newpoints = parseInt( $dark('#'+this.object[i]+'_tt').getAttr('onmouseover').match(/\d+<\/td><\/tr>/g)[1] )+1;
					// Get points from items
					var itempoints = parseInt( $dark('#'+this.object[i]+' div[2]').html() );
					if(itempoints<0){
						$dark('#'+this.object[i]+' div[1]').html( '-' );
						$dark('#'+this.object[i]+' div[2]').html(-itempoints);
						var color='red';
					}else{
						var color='green';
					}
					// Get max points and calculate max points after upgrade
					var max = parseInt( $dark('#'+this.object[i]+'_tt').getAttr('onmouseover').match(/\d+<\/td><\/tr>/g)[2] );
					var max_change = 1+(newpoints-1)%2;
					//Show Max
					$dark('#'+this.object[i]+' div[3]').html( '/' ).afterFrom( $dark('#'+this.object[i]+' div[6]') );
					$dark('#'+this.object[i]+' div[3]').style('color:#666;').html( max ).afterFrom( $dark('#'+this.object[i]+' div[6]') );
					
					// Item points change
					var maxitempoints = parseInt( $dark('#'+this.object[i]+'_tt').getAttr('onmouseover').match(/ (\+\d+|-\d+|0)<\/td><\/tr>/)[1] );
					if(maxitempoints-itempoints>=max_change-1){
						var itempoints_change=max_change-1;
					}else{
						var itempoints_change=0;
					}
					
					// Total Change
					var total=parseInt( $dark('#'+this.object[i]+' div[4]').html() );
					var total_change=1+itempoints_change;
					
					$dark('#'+this.object[i]).addClass('gca-training-info');
					$dark('#'+this.object[i]+' div[0]').addClass('gca-training-value').addChild( $dark('*sup').class("gca-training-green").html("+1") );
					$dark('#'+this.object[i]+' div[2]').addClass('gca-training-value').addChild( $dark('*sup').class("gca-training-"+color).html("+"+itempoints_change+'<font color="black">*</font>') );
					$dark('#'+this.object[i]+' div[4]').addClass('gca-training-value').addChild( $dark('*sup').class("gca-training-green").html("+"+total_change+'<font color="black">*</font>') );
					$dark('#'+this.object[i]+' div[6]').addClass('gca-training-value').addChild( $dark('*sup').class("gca-training-green").html("+"+max_change) );
					
					$dark('*div').class('gca-training-discount').addChild(
						$dark('*div').class('guild-flag icon').tooltip([
							gca_locale.get('guild_discount')+" : ",
							subFuncts.strings.insertDots(Math.round(Math.pow(parseInt($dark('#'+this.object[i]+' div[0]').html())-4,this.coeff[i])*(1 - reduction_1)))+" <img src=\"img/ui/icon_gold.gif\" align=\"absmiddle\">"+" ("+guild_discount_text+")"])
					).afterFrom('#'+this.object[i]+'_tt');
					
					var onmouseover=$dark('#'+this.object[i]+'_tt').getAttr('onmouseover').replace(/\d+<\/td><\/tr>/i,(total+total_change)+"* </td></tr>").replace(/\+*-*\d+<\/td><\/tr>/i,newpoints+" </td></tr>").replace(/\+*-*\d+<\/td><\/tr>/i,max+max_change+" </td></tr>").replace(/\+*-*\d+(\s+[^\s]+\s+)\+*-*\d+<\/td><\/tr>/i,itempoints+itempoints_change+"*$1"+maxitempoints+"* </td></tr>").replace("<tr>","<tr><td style=\\\"color:#00B712; font-weight: bold; font-size:10pt\\\" colspan=\\\"2\\\" nowrap=\\\"nowrap\\\">"+$dark('#mainnav a[0]').text()+"</td></tr><tr>");
					if($dark('img[1]', $dark('#'+this.object[i]+'_tt').parent() ))
						$dark('img[1]', $dark('#'+this.object[i]+'_tt').parent() ).setAttr('onmouseover',onmouseover);
					else
						$dark('a[0]', $dark('#'+this.object[i]+'_tt').parent() ).setAttr('onmouseover',onmouseover);
				}
			}
		},
		
		//Training Costs Calculator
		training_cost_calculator : {
			// Stats ids
			object : {
				strength : "char_f0",
				skill : "char_f1",
				agility : "char_f2",
				constitution : "char_f3",
				charisma : "char_f4",
				intelligence : "char_f5"
			},
			// Stats coeff
			coeff : {
				strength : 2.6,
				skill : 2.5,
				agility : 2.3,
				constitution : 2.3,
				charisma : 2.5,
				intelligence : 2.4
			},
			run : function(){				
				$dark('#content').addChild(
					$dark('*div').class('contentItem').addChild([
						$dark('*h3').html( gca_locale.get("training_cost_calculator") ),
						$dark('*div').css('padding: 10px;width: 514px;padding-bottom: 12px;').class('contentItem_content').addChild(
							$dark('*table').class('training_cost_calculator_table').css('width: 100%;').attr('align','center').addChild(
								$dark('*tbody').addChild(
									$dark('*tr').addChild([
										$dark('*th').attr('align','center').html( gca_locale.get('stats') ),
										$dark('*th').attr('align','center').html( gca_locale.get('from') ),
										$dark('*th').attr('align','center').html( gca_locale.get('to') ),
										$dark('*th').attr('align','center'),
										$dark('*th').attr('align','center').css('width: 130px;').html( gca_locale.get('cost')+' <img src="img/res2.gif" align="absmiddle" border="0">')
									])
								)
							)
						)
					])
				);
				
				for(var i in this.object){
					var object_value=$dark('#'+this.object[i]+' .training_value[0]').html().match(/(\d+)/)[1]*1;
					$dark('.training_cost_calculator_table[0] tbody[0]').addChild([
						$dark('*tr').addChild([
							$dark('*th').attr('align','center').html( $dark('#'+this.object[i]+'_tt span[0]').html() ),
							$dark('*th').addChild(//from
								$dark('*input').id('input_stat_'+i+'a').attr('type','text').attr('size','5').value( object_value )
							),
							$dark('*th').addChild(//to
								$dark('*input').id('input_stat_'+i+'b').attr('type','text').attr('size','5').value( object_value )
							),
							$dark('*th').attr('align','center').css('width: 80px;').addChild([
								$dark('*input').id('add_'+i).class('small_button').type('button').value('+1').click(function(){
									this.parentNode.parentNode.getElementsByTagName('input')[1].value++;
									gca_section_training.display.training_cost_calculator.calculate();
								}),
								$dark('*input').id('remove_'+i).class('small_button').type('button').value('-1').style('margin-left:4px;').click(function(){
									this.parentNode.parentNode.getElementsByTagName('input')[1].value--;
									gca_section_training.display.training_cost_calculator.calculate();
								})
							]),
							$dark('*th').attr('align','center').addChild(
								$dark('*span').id(i+'_result')
							)
						])
					]);
				}
				
				var strength_gold = parseInt($dark('#training_box .training_costs[0]').html().replace(/(\.|<.+)/g,''));
				var original_strength_gold = Math.round(Math.pow( parseInt($dark('#char_f0 div[0]').html())-4 , 2.6 ));
				
				var isOdd = function(num) {return num % 2;}
				var discount = 100 - Math.round(((strength_gold/original_strength_gold)*100));
				var neptunes_costume = isOdd(discount)?true:false;
				var guild_discount = (neptunes_costume)?(discount-3):discount;
				var guild_discount_text = (neptunes_costume)?(''+guild_discount+'% +3%'):(''+guild_discount+'%');
				
				var options='';
				for(var i=0;i<=15;i++){
					if(guild_discount==2*i){
						options+='<option value="'+i+'" selected>'+i+' ('+(2*i)+'%)</option>';
					}else{
						options+='<option value="'+i+'">'+i+' ('+(2*i)+'%)</option>';
					}
				}
				
				$dark('.training_cost_calculator_table[0] tbody[0]').addChild([
					$dark('*tr').addChild([
						$dark('*th').attr('align','center').attr('colspan','2').html( gca_locale.get("training_camp_level")+':' ),
						$dark('*th').attr('align','center').addChild(
							$dark('*select').id('guild_level').html( options )
						),
						$dark('*th').attr('align','right').html( gca_locale.get('reduction')+':' ),
						$dark('*th').attr('align','center').addChild(
							$dark('*span').id('reduction_value')
						)
					]),
					$dark('*tr').addChild([
						$dark('*th').attr('align','center').attr('colspan','2').addChild(
							$dark('*label').addChild([
								$dark('*span').html('Neptunes costume (+3%) '),
								$dark('*input').id('neptunes_costume').attr('type','checkbox')
							])
						),
						$dark('*th').attr('align','center').attr('colspan','3')
					]),
					$dark('*tr').addChild([
						$dark('*th').attr('align','center').attr('colspan','2'),
						$dark('*th').attr('align','right').attr('colspan','2').html( gca_locale.get('total_cost')+':' ),
						$dark('*th').attr('align','center').addChild(
							$dark('*span').id('total_cost_value')
						)
					]),
					$dark('*tr').addChild(
						$dark('*th').attr('align','center').attr('colspan','5').addChild([
							$dark('*input').class('button2').type('button').id('calculate_button').value( gca_locale.get('calculate') ).click(function(){
								gca_section_training.display.training_cost_calculator.calculate();
							}),
							$dark('*input').class('button3').type('button').id('reset_button').value( gca_locale.get('reset') ).click(function(){
								gca_section_training.display.training_cost_calculator.reset();
							})
						])
					),
				]);
				
				$dark('#neptunes_costume').element.checked = neptunes_costume;
				
				this.total_gold_spent();
				this.calculate();
			},
			reset : function(){
				for(var i in this.object){
					var object_value=$dark('#'+this.object[i]+' .training_value[0]').html().match(/(\d+)/)[1]*1;
					$dark('#input_stat_'+i+'a').value( object_value );
					$dark('#input_stat_'+i+'b').value( object_value );
				}
				this.calculate();
			},
			total_gold_spent : function(){
				var total_cost=0;
				for(var i in this.object){
					var end=$dark('#'+this.object[i]+' .training_value[0]').html().match(/(\d+)/)[1]*1;
					for(var j = 5; j < end; j++)
						total_cost += parseInt(Math.pow(j-4,this.coeff[i])*1);
				}
				
				$dark('.buildingDesc[0]').addChild(
					$dark('*font').class('total_gold_spent_on_training').html( subFuncts.strings.insertDots(total_cost)+' <img src="img/res2.gif" align="absmiddle" border="0"> '+gca_locale.get('spent') )
				);
			},
			calculate : function(){
				var reduction_1=($dark('#neptunes_costume').element.checked)? (1 - (2*$dark('#guild_level').value()+3)/100):(1 - 2*$dark('#guild_level').value()/100);
				
				var total_cost=0;
				for(var i in this.coeff){
					var begin=parseInt( $dark('#input_stat_'+i+'a').value() );
					var end=parseInt( $dark('#input_stat_'+i+'b').value() );
					
					var count = 0;
					for(var j = begin; j < end; j++)
						count += parseInt(Math.pow(j-4,this.coeff[i])*reduction_1);
					
					$dark('#'+i+'_result').html( count );
					
					total_cost=total_cost+count;
				}
				
				$dark('#reduction_value').html( subFuncts.strings.insertDots( parseInt( (total_cost-total_cost*reduction_1)/reduction_1 ) ) + ' <img src="img/res2.gif" align="absmiddle" border="0">' );
				$dark('#total_cost_value').html( subFuncts.strings.insertDots(total_cost) + ' <img src="img/res2.gif" align="absmiddle" border="0">' );
				
				for(var i in this.coeff){
					if(total_cost==0){
						var value=0;
					}else{
						var value=parseInt( $dark('#'+i+'_result').html()*100/total_cost );
					}
					$dark('#'+i+'_result').html( subFuncts.strings.insertDots( $dark('#'+i+'_result').html() ) + ' <img src="img/res2.gif" align="absmiddle" border="0"> <font color="#666">('+value+'%)</font>' );
				}
			}
		}
	},
	data : {
		// Stats ids
		object : {
			strength : "char_f0",
			skill : "char_f1",
			agility : "char_f2",
			constitution : "char_f3",
			charisma : "char_f4",
			intelligence : "char_f5"
		},
		objectNames : [
			"strength",
			"skill",
			"agility",
			"constitution",
			"charisma",
			"intelligence"
		],
		update : function(){
			// Get analized data
			this.analized_data = gca_data.get('player_attributes_points', false);
			
			// If we have the data
			if(!this.analized_data)
				return;
			
			var attr = this.objectNames[ parseInt( document.location.href.match(/skillToTrain=(\d)/i)[1] )-1 ];
			// Check if data is valid
			if( this.analized_data[attr].basic!=parseInt( $dark('#'+this.object[attr]+' div[0]').html() ) ){
				var multiTimes = parseInt( $dark('#'+this.object[attr]+' div[0]').html() )-this.analized_data[attr].basic;
				for(var i=0;i<multiTimes;i++){
					this.reanalize(attr);
				}
			}
			
			//END
		},
		reanalize : function(attr){
			this.analized_data = gca_data.get('player_attributes_points', false);
			this.analized_data[attr].basic++;
			this.analized_data[i].percent=this.analized_data[i].points;
			for(var j=0;j<this.analized_data[i].percentArray.length;j++)
				this.analized_data[i].percent += Math.round((this.analized_data[i].percentArray[j]*this.analized_data[attr].basic)/100);
			//this.analized_data[i].max[0]+=(1+this.analized_data[attr].basic%2);
			//console.log(this.analized_data[attr]);
			gca_data.set('player_attributes_points', this.analized_data);
		}
	}
}