@Web

Feature: Results

    As a user,
    I would like to see "Results" and able to filter "Results" by different events

    Background:
        Given I am on Ao web home page
        When I navigate to "Results" under "Tournament"
        Then I see 'Results' page

    @AODS-5688
    Scenario: By default I see the results of the all events played
        Then I click on "Day 1" button
        Then I see "Event" title on the filter
        And I see all "Men's Singles" and "Women's Singles" matches played

    @AODS-5689
    Scenario: can filter results by single event name

        Then I click on "Day 2" button
        Then I select "Men's Singles" from the dropdown menu
        Then I see "Men's Singles" matches played

    @AODS-5690
    Scenario: can filter results by multiple event names
        Then I click on "Day 5" button
        Then I select "Men's Singles","Women's Singles","Men's Doubles","Women's Doubles","Mixed Doubles","Junior Boys' Singles","Junior Girls' Singles","Junior Boys' Doubles" from the dropdown menu
        Then I see "Men's Singles","Women's Singles","Men's Doubles","Women's Doubles","Mixed Doubles","Junior Boys' Singles","Junior Girls' Singles","Junior Boys' Doubles" matches played

    @AODS-5691
    Scenario: can search results by Player name
        Then I click on "Day 1" button
        Then I search player name "Altmaier" in search box and validate results

    @AODS-5692
    Scenario: can search results by Country name
        Then I click on "Day 1" button
        Then I search Country name "Australia" in search box and validate results

    @AODS-5693
    Scenario: can clear search results
        Then I click on "Day 1" button
        Then I search Country name "Belgium" in search box and validate results
        Then I clear search results for "Belgium"

    @AODS-5807@Smoke
    Scenario: can open players profile using Results page and verify the player’s details
        When I click on name of player "S. Tsitsipas "
        Then I see all details of the player
            | Player             | SinglesRank | DoublesRank | Age      | Born           | Height            | Weight         | PlayingHand  |
            | Stefanos Tsitsipas | 6           | 209         | 25 years | Athens, Greece | 193cm (6 ft 4 in) | 90kg (198 lbs) | Right-handed |

