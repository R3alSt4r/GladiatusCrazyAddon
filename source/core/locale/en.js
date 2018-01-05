﻿/*
 * Gladiatus Crazy Addon Translation
 * Name : Engish (United States)
 * Code : US
 * Tag  : en-US
 * Translator: DarkThanos, GreatApo
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages["en"] = {

	// Language name
	name : "English (United States)",
	// Translators (authors of this script)
	translators : ["DarkThanos", "GreatApo"],

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "The craziest add-on for gladiatus ever!"
		},

		// General
		general : {

			// Days
			days : "day(s)",
			// Minutes
			minutes : "minute(s)",
			// No data
			no_data : "No data",

			// Modal buttons
			confirm : "Confirm",
			cancel : "Cancel",
			close : "Close",
			error : "Error",
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "Use a life potion",
			life_potion_used : "A life potion was used",
			life_potion_left : "You now have {{number}} life potion(s)",
			
			// Life points recovery
			life_recover_full : "Full life recover",

			// Button bar - Message
			message_private_write : "Write private message",
			message_guild_write : "Write guild message",
			message_send : "Send",
			message_sent_success : "Message was sent successfully",
			message_sent_failed : "Failed to sent message",
			message_empty : "The message is empty",
			message_exclude_me : "Exclude me",

			// Button bar buttons
			guild_market_goto : "Go to guild's market",
			guild_storage_goto : "Go to guild's storage",
			guild_bank_goto : "Go to guild's bank",
			guild_warcamp_goto : "Go to guild's war camp",
			guild_jail_goto : "Go to guild's jail",
			guild_library_goto : "Go to guild's library",
			guild_medic_goto : "Go to guild's medic center",
			simulator_goto : "Go to simulator",
			stats_display : "Display my stats",
			online_display : "Display online players",

			// Online friends
			online_friends : "Online Friends",
			guild_friends : "Guild Friends",
			family_friends : "Family Friends",

			// Guild donate
			donate_gold_confirm : "Are you sure you want to donate {{number}} gold?",
			donate_gold_success : "Gold donated successfully",
			donate_gold_failed : "Gold donation failed",
			donate_gold_no_gold : "There is no gold to donate",
			donate_gold_all_gold : "Donate all your gold",

			// Quest timer
			quest_full : "Full",
			quest_new : "New",

			// Pray icon
			pray_start : "Press to start praying",
			pray_stop : "Press to stop praying",
			heal : "heal",

			// Notifications
			notification_guild_application : "There is a pending guild application!",
			low_durability_items : "There are {{number}} item(s) with durability under {{percent}}%",

			// Gold - Exp data
			gold_exp_data : "Gold and Experience Data",
			gold_exp_data_today : "Last 24 hours",
			gold_exp_data_week : "Last 7 days",
			gold_exp_data_avg_day : "Average values per day",
			gold_exp_data_to_level_up : "Days left to level up",
			gold_exp_data_package_tax : "Weekly gold-to-package tax",
			gold_exp_data_measurements : "Measurements",
			gold_exp_data_total_exp : "Total experience",
			gold_exp_data_total_gold : "Total gold",
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Difference",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Drop an item to see the materials needed to repair it",
			workbench_6th_slot_empty : "Workbench\'s 6th slot needs to be empty",
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Open all",
			mysterybox_open_stop : "Stop",
			mysterybox_open_done : "Done!"
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "All your gold",

			// Library
			library_per_point_cost : "Cost per stat point",
			library_gold_left : "Guild gold after activation",

			// Medic
			medic_lost_points : "Lost points",
			medic_points_to_heal : "Points to heal",
			medic_life_after_heal : "Life after heal"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% chance, between dropped materials"
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "Stats Points",
			points_breakdown : "Points Breakdown",
			stats_calculated_with_yourself_as_an_opponent : "* Stats are calculated with the concept of attacking yourself.",
			// Cost calculator
			total_cost : "Total cost",
			// Discount show
			costs_discount : "Training costs discount: {{number}}%"
		},

		// Auction section
		auction : {
			// Info
			items_info : "Items information",
			// Number of items in the page
			number_of_items : "Number of items : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Number of bidden items : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Hide your gold here",
			// Price of item equals to its value
			price_value_function : "Price = Value + {{number}}",
			// Levels you can see
			levels_you_can_see : "You can see items from level {{min}} to level {{max}}.",
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "This item costs only {{number}} gold.",
			item_is_soulbound : "This item is soulbound.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Do you really want to buy this item?"
		},
		
		// Forge
		forge : {
			forge_ended : "Forge ended!",
			recraft_item : "Re-craft item"
		},
		
		// Packages
		packages : {
			event_items : "Event items",
			known_scroll : "You know this scroll",
			unknown_scroll : "You don't know this scroll"
		},

		// Settings
		settings : {
			// Settings
			settings : "Settings",
			// Description
			description : "Enable or disable the addon's features.",
			description_click_button : "Click the button below to go to addon's settings...",
			
			// Categories
			category_global : "Global",
			category_overview : "Overview",
			category_messages : "Messages",
			category_packages : "Packages",
			category_pantheon : "Pantheon",
			category_reports : "Reports",
			category_training : "Training",
			category_merchants : "Merchants",
			category_forge : "Forge",
			category_arena : "Arena",
			category_magus : "Magus",
			category_market : "Market",
			category_expedition : "Expedition",
			category_guild : "Guild",
			category_auction : "Auction",
			category_events : "Events",
			category_sound : "Sounds",
			category_data : "Data",

			// Settings - Global
			category_global$language_select : "Select addon's language",
			category_global$sound_notifications : "Enable sound notifications",
			category_global$browser_notifications : "Enable browser notifications",
			category_global$extended_hp_xp_info : "Display extended HP and XP header info",
			category_global$extended_hp_xp_info_potion : "Display life potion use icon",
			category_global$hp_timer_for_full_life : "Display minutes left to full heal",
			category_global$shortcuts_bar : "Enable the shortcuts bar",
			category_global$shortcuts_bar_buttons : "Select shortcuts for the shortcuts bar",
			category_global$auction_status_bar : "Display auction status bar",
			category_global$auction_status_notification : "Alert when auction status changes",
			category_global$top_fixed_bar : "Enable top fixed bar",
			category_global$advance_main_menu : "Improve main menu",
			category_global$submenu_click_to_change : "Submenu change on click",
			category_global$remember_tabs : "Remember merchants tabs",
			category_global$attacked_timers : "Show attacked timers",
			category_global$quest_timer : "Show quests status or timer",
			category_global$merchants_timer : "Show merchants timer indicator",
			category_global$forge_timers : "Show forge/smelt timer indicator",
			category_global$cooldown_sound_notifications : "Enable cooldowns sounds notifications (expedition, dungeon, arena)",
			category_global$notify_new_guild_application : "Notify me when there is a new guild application",
			category_global$notify_new_guild_application_interval : "Check for applications every (minutes)",
			category_global$x_scroll : "Enable gladiatus' horizontal scroll",
			category_global$item_shadow : "Enable items shadows",
			category_global$inventory_options_group : "Group inventory options",
			category_global$inventory_gold_info : "Show inventory items' gold price",
			category_global$pagination_layout : "Change pages-box's layout",
			category_global$gold_exp_data : "Show gold and exp data",
			category_global$pray_shorcut : "Display pray shortcut when in Underworld",
			category_global$centurio_powerups_timers : "Display Centurio & PowerUps timers on Premium button",
			category_global$show_durability : "Display durability on item's bottom-left corner",
			category_global$min_durability : "Notification for items with durability+conditioning under _% (move to 0 to disable it)",
			// Settings - Overview
			category_overview$analyze_items : "Analyze items stats (needed for training)",
			category_overview$food_life_gain : "Show life gain from foods",
			category_overview$block_avoid_caps : "Show block and Avoid caps",
			category_overview$best_food : "Highlight best food",
			category_overview$overfeed_food : "Fade foods that will over-heal you",
			category_overview$daily_bonus_log : "Log daily bonus",
			category_overview$buffs_detailed_time : "Show detailed timers on guild buffs",
			category_overview$mercenaries_manager : "Show mercenaries manager",
			category_overview$mercenary_tooltip_show : "Show mercenaries tooltips",
			category_overview$more_statistics : "Show more stats on statistics tab",
			category_overview$achivements_layout : "Enhance achievements layout",
			category_overview$costumes_layout : "Enhance costumes layout",
			category_overview$items_repair_overview : "Show needed-materials-to-repair box",
			// Settings - Messages
			category_messages$messages_layout : "Improve messages layout",
			category_messages$show_unread : "Highlight unread messages",
			category_messages$separate_days : "Separate messages from different days",
			category_messages$send_message_box : "Enable send message box",
			category_messages$more_guild_mate_info : "Show more guild mates info",
			category_messages$show_message_links : "Show links included on messages",
			category_messages$get_guild_battle_info : "Auto load guild battle results",
			category_messages$show_sidebar : "Show messages sidebar",
			category_messages$fix_header_links : "Fix messages title link click bug",
			category_messages$new_message_focus : "Focus on message body",
			category_messages$new_message_friend_list : "Enable select friend from list button",
			// Settings - Packages
			category_packages$filters_layout : "Enhance filters layout",
			category_packages$compact_info_layout : "Make info layout compact",
			category_packages$items_layout : "Improve items layout",
			category_packages$load_more_pages : "Load more pages",
			category_packages$pages_to_load : "Number of pages to load",
			category_packages$item_price : "Show items' price",
			category_packages$special_category_features : "Enable special features per category",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Enable quest grouping",
			category_pantheon$quests_detailed_rewards : "Show detailed quests rewards",
			category_pantheon$missions_show_completed : "Show completed missions",
			category_pantheon$gods_show_points_percent : "Show god points percent",
			category_pantheon$open_many_mysteryboxes : "Open multiple mystery boxes",
			category_pantheon$show_mysterybox_rewards_rubies : "Show mystery-box reward's value in rubies",
			// Settings - Reports
			category_reports$style_change : "Improve reports' list layout",
			category_reports$load_loot_tooltips : "Load each report's reward",
			category_reports$found_items : "Gather data about found items",
			// Settings - Training
			category_training$show_discount : "Show training discount",
			category_training$show_basics_in_bars : "Show basics in bars",
			category_training$multiple_train : "Enable multiple training",
			category_training$calculator_train : "Enable cost calculator",
			category_training$show_analyze_items_data : "Show analyzed items data in tooltips",
			category_training$show_points_after_upgrade : "Show stat points after upgrade",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Fade items that you can not afford",
			// Settings - Forge
			category_forge$material_links : "Show packages & market shortcuts for each material need (forge/repair)",
			category_forge$show_levels : "Show Prefix/Sufix/Base item levels next to names (forge)",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignore attack confirmations (over 5 attacks message etc)",
			category_arena$show_simulator_imagelink : "Show an image-link to the simulator (gladiatussimulator.tk)",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Fade items that you can not improve",
			// Settings - Market
			category_market$soulbound_warning : "Buy confirmation on soul-bound items",
			category_market$one_gold_warning : "Buy confirmation on items that cost 1 gold",
			category_market$cancel_all_button : "Show cancel-all button",
			category_market$remember_sell_duration : "Remember last chosen sell duration",
			category_market$sell_duration : "Select default sell duration",
			category_market$remember_sort : "Remember sort order",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Show crafting materials each enemy drops",
			category_expedition$underworld_layout : "Show underworld's enemies layout like expedition's",
			// Settings - Guild
			category_guild$jail_layout : "Improve jail's layout",
			category_guild$library_layout : "Improve library's layout",
			category_guild$library_fade_non_scrolls : "Fade items that are not scrolls on library",
			category_guild$library_tooltip_data : "Add more data on library's tooltips",
			category_guild$bank_donate_layout : "Improve bank's donate layout",
			category_guild$bank_book_layout : "Improve bank's book layout",
			category_guild$medic_layout : "Improve medic's layout",
			// Settings - Auction
			category_auction$items_counters : "Count items and bidden items",
			category_auction$more_search_levels : "Show more levels in search options",
			category_auction$item_price_analyze : "Analyze items' prices",
			category_auction$item_level : "Show items level",
			category_auction$x3_items_per_line : "Change layout to 3 items per line",
			category_auction$multi_bids : "Bid many items without page refresh",
			category_auction$extra_item_stats : "Show extra stats on item images",
			// Settings - Events
			category_events$craps_timer : "Display dice event's timer on top",
			category_events$server_quest_timer : "Display server-quest or location event's timer on top",
			// Settings - Sound
			category_sound$enabled : "Enable sound system",
			category_sound$muted : "Mute/Unmute sounds",
			category_sound$volume : "Sounds volume",
			// Settings - Data
			category_data$export_settings : "Export settings data to file",
			category_data$import_settings : "Import settings data from file",
			category_data$reset_settings : "Reset addon's setting",
			category_data$clear_data : "Clear all addon's data",

			// Buttons
			save : "Save",
			export : "Export",
			import : "Import",
			reset : "Reset",
			clear : "Clear",
			do_not_show : "Do not show",
			show_as : "Show as",

			// Info
			translated_percent : "Translated percent: {{number}}%",
			translated_by : "Translated by: {{string}}",
			reset_settings_confirm : "Are you sure you want to reset addon's settings?",
			clear_data_confirm : "Are you sure you want to clear all the addon's data?",

			// Notifications
			notification_reload : "Reload the page for the changes to take effect"
		}
	}
}
