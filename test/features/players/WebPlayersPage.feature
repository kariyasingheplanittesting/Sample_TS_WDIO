@Web

Feature: Results

    As a user,
    I would like to see "Results" and able to filter "Results" by different events

    Background:
            Given I am on Ao web home page
            When I navigate to "Players" under "Tournament"
            Then I see 'Players' page

    @AODS-5818
        Scenario: By default I see the all players
            Then I see more than "10" players displayed
            And by default "All Events" filtering option is selected

    @AODS-5819
        Scenario: I can filter players by event name
            Then I fiter players by "Men's Singles"
            Then I see all players who played Men's Singles such as "Djokovic, Novak" 
            And I don't see any Women's Singles players such as "Bogdan, Ana"

    @AODS-5820@Smoke
        Scenario: can search players by Player name
            Then I search player name "Novak" in search box and validate searched player results  

    @AODS-5821
        Scenario: can search players by Country name
            Then I search players by Country name "Australia" in search box and validate results

    @AODS-5822
        Scenario: can clear searched results
            Then I search players by Country name "Australia" in search box and validate results
            Then I clear results for "Australia"