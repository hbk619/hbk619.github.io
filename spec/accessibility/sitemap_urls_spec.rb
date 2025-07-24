require 'nokogiri'
require 'open-uri'
require 'axe-rspec'
require 'capybara'
require 'capybara/rspec'
require 'selenium-webdriver'

Capybara.register_driver :headless_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  options.add_argument('--disable-gpu')
  options.add_argument('--window-size=1400,1400')
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.default_driver = :headless_chrome
Capybara.javascript_driver = :headless_chrome

describe 'Accessibility checks for sitemap pages', type: :feature, js: true do
  sitemap_url = 'http://localhost:4000/sitemap.xml'
  sitemap = Nokogiri::XML(URI.open(sitemap_url))
  urls = sitemap.xpath('//xmlns:url/xmlns:loc').map(&:text)

  urls.each do |url|
    it "dark mode has no accessibility violations on #{url}" do
      visit url
      page.execute_script "window.localStorage.setItem('theme','dark')"
      refresh
      expect(page).to have_text "Privacy Notice"
      expect(page).to be_axe_clean.according_to :wcag2a, :wcag2aa, :wcag22aa, :section508
    end

    it "light mode has no accessibility violations on #{url}" do
      visit url
      page.execute_script "window.localStorage.setItem('theme','light')"
      refresh
      expect(page).to have_text "Privacy Notice"
      expect(page).to be_axe_clean.according_to :wcag2a, :wcag2aa, :wcag22aa, :section508
    end
  end
end
