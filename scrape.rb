require 'rest-client'
require 'nokogiri'

@base_url = "https://weather.com/weather/today/l/"
def init
  puts "Enter a zip code."
  zip = gets.chomp
  m = /\d\d\d\d\d/.match(zip)
  if !m || zip.length > 5
    puts "Not a valid zip code, try again"
    init
  else
    @url = @base_url + zip
    get_page
    user_choice
  end
end

def user_choice
    puts
  puts "What information would you like? (Temp, Wind, Humidity, Visibility, All, Quit)"
  @choice = gets.chomp.downcase
  case @choice
  when 'temp', 'wind', 'humidity', 'visibility', 'all' 
    self.method(@choice).call()
  when 'quit'
    return
  else 
      puts
    puts "Invalid choice. Please make a valid selection."
    user_choice
  end
end

def cont
  if @choice != "all" 
      puts
    puts "Would you like to check anything else for this zip? (y/n)"
    res = gets.chomp.downcase
    if res == 'y'
      user_choice
    else
      finish
    end
  end
end
def finish 
    puts
  puts "Would you like to search another zip code? (y/n)"
  res = gets.chomp.downcase
  if res == 'y'
    init
  else
    puts "Thank you!"
    exit
  end
end

def get_page
  html = File.open("weather.html")
  data = Nokogiri::HTML(html)
  temp_select = '.large-temp span'
  weather_select = '.full-glomo-details div span'
  @temp_data = data.css(temp_select)
  @weather_data = data.css(weather_select)
end

def temp
    puts
  puts @temp_data[0].text + " (" + @temp_data[1].text + " " + @temp_data[2].text + ")"
  cont
end

def wind
    puts
  puts @weather_data[0].text
    cont
end

def humidity
    puts
  puts @weather_data[1].text
    cont
end

def visibility
    puts
  puts @weather_data[4].text
    cont
end

def all
    puts
  temp
  wind
  humidity
  visibility
  finish
end

init

# response = File.open("path/to/file", "w") { |file|  }
# html = response.body

# #define what we're targeting
# selector = ".grid-posts h2 .lede__link"

# data = Nokogiri::HTML(html)
# elements = data.css(selector)
# elements.each do |headline_links|
#   puts headline_links.text.strip
# end