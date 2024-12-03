# spec/system/citizen_login_spec.rb
RSpec.describe "Citizen login", type: :system do
    it "logs in with valid credentials and redirects to forums page" do
      citizen = Citizen.create!(name: "John Doe", email: "john@example.com", password: "password123")
      #citizen.confirm # Skip the confirmation step for tests
      visit new_citizen_session_path
      fill_in "Email", with: citizen.email
      fill_in "Password", with: "password123"
      click_button "Log in"
      
      expect(page).to have_current_path(forums_path)
      #expect(page).to have_text(citizen.name)
    end

    it "creates a forum and redirects to the forum page" do
        citizen = Citizen.create(name: "John Doe", email: "john@example.com", password: "password123")
        login_as(citizen) # Use Warden or Devise helpers to log in
        visit new_forum_path
        fill_in "Name", with: "New Forum"
        click_button "Create Forum"
    
        expect(page).to have_current_path(forum_path(Forum.last))
        expect(page).to have_text("New Forum")
      end
  end
  