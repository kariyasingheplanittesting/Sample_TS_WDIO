@Web
Feature: AO Match Highlights

    As a user,
    I would like to see the "AO Match Hightlights"

    Background:
        Given I am on AO web home page
        And I navigate to 'News' under 'NEWS'
        And I see 'News' page is loaded


    Scenario: clicking on an AO Match Highlight video
        Then I see "AO Match Highlights"
        Then I click on video "Alfie Hewett v Tokito Oda Match Highlights (F) | Australian Open 2023" under "AO Match Highlights" click on the arrow "3" times

        
    Scenario: clicking on an AO Match Highlight video
        Then I see "AO Match Highlights"
        Then I click on video "Stefanos Tsitsipas v Novak Djokovic Highlights (F) | Australian Open 2023" under "AO Match Highlights" click on the arrow "0" times