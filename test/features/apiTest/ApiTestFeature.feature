@API
Feature: AO Simulator API

  As a test engineer,
  I'd like to run the Simulator for a set amount of time in order to identify special scenarios
  So that, I can validate scoring data from both the frontend and the backend

  Background:

  @API
  Scenario: As a user, I can see the match Status
    Given there is no data available
    When scheduled matches have started
    | from          | to            | speed | pauseTimestamp1 | pauseTimestamp2 | pauseTimestamp3 | fromDraw | fromDrawDay |
    | 1612755000000 | 1612756800000 | 10    | 0               | 0               | 0               | MD       | 1           |
    Given I am on AO web home page
    And I navigate to "Draws" under "MATCHES"
    And I select score card with following players
    | playerOneName    | playerTwoName |
    | A. Ramos-Vinolas | T. Fritz 27   |
    Then I see the following players on match details page
    | playerOneName    | playerTwoName |
    | A. Ramos-Vinolas | T. Fritz 27   |
