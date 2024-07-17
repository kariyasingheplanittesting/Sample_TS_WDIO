# Precondition:
# Before runing with the following scnearios, the AO simulator should be run at least up to day 8.
# For Performance testing , Update the package.json with @Perf tag,
#  E.g.   "app-android-test-bs": "yarn lint && npx wdio config/wdio.android.bs.app.conf.ts --cucumberOpts.tagExpression='@Perf'",

# Limitations:
# For the time being, the following scenarios can only be run for Dev releases.

@Perf 
Feature: APP Navigation

	As a user,
	I would like to navigate through all of the screens
	So, I can see the content

	Background:

	Scenario: can see Home screen content
		When I am on AO app Home screen
		Then I can see content of the Home screen

	Scenario: any favourite player can be added to the favourites list
		Given I selected "B.Bencic" from Suggested Players list
		When I add player "Belinda Bencic" to the Favourites list
		Then I can see the player has "Favourited" label

	@Skip_For_Ios
	Scenario: can see Schedule screen content
		When I navigate to "Schedule" screen
		And  I am able to see content of the Schedule screen
		And I select "Day 8" from Days Picker
		Then I can see schedules up to the match with following players
			| playerOneName | playerTwoName |
			| A.Sabalenka   | B.Bencic      |

	Scenario: can see content of Live tab in Scores screen
		Given there are no live matches in progress
		When I navigate to "Scores" screen
		Then no details of live matches are visible

	@Skip_For_Ios
	Scenario: can see content of Results tab in Scores screen
		When I navigate to "Results" tab
		And  I am able to see content of the Results screen
		And I select "Day 8" from Days Picker
		Then I can see results up to the match with following players
			| playerOneName | playerTwoName |
			| A. de Minaur  | N. Djokovic   |

	Scenario: can see Draws screen content
		When I navigate to "Draws" screen
		And I select score card with following players on Draws screen
			| playerOneName | playerTwoName |
			| Z. Bergs      | L. Djere      |
		Then I can see draws up to the match with following players
			| playerOneName | playerTwoName |
			| Z. Bergs      | L. Djere      |

	Scenario: can see contents of Favourites tab in Players screen
		When I navigate to "Players" screen
		Then I can see "Belinda Bencic" is in the list

	@Skip_For_Ios
	Scenario: can see contents of Men tab in Players screen
		When I navigate to "Men" tab
		Then I can see "Radu Albot" is in the list

	@Skip_For_Ios
	Scenario: can see contents of Women tab in Players screen
		When I navigate to "Women" tab
		Then I can see "Robin Anderson" is in the list

	Scenario: can see contents of News screen
		When I navigate to "News" screen
		Then I can see the news content