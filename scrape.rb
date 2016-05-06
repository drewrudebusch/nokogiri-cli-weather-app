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
    puts "ERROR: "+ @choice + " is an invalid choice. Please make a valid selection."
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
    elsif res == 'n'
      finish
    else
      puts "ERROR: " + res + " is not a valid response. Please enter a valid response."
      cont
    end
  end
end
def finish 
    puts
  puts "Would you like to search another zip code? (y/n)"
  res = gets.chomp.downcase
  if res == 'y'
    init
  elsif res == 'n'
      puts
    puts "Thank you!"
    exit
  else
    puts "ERROR: " + res + " is not a valid response. Please enter a valid response."
    finish
  end
end

def get_page
  #Load data from a call to weather.com for user-entered zip
  # response = RestClient.get(@url)
  # html = response.body
  # data = Nokogiri::HTML(html)
  
  #Load data from a downloaded version of weather.com for zip: 98121
  html = File.open("weather.html")
  data = Nokogiri::HTML(html)

  temp_select = '.large-temp span'
  weather_select = '.full-glomo-details div span'
  @temp_data = data.css(temp_select)
  @weather_data = data.css(weather_select)
end

def temp
    puts
  puts "Current temperature: " + @temp_data[0].text + " (" + @temp_data[1].text + " " + @temp_data[2].text + ")"
  cont
end

def wind
    puts
  puts "Current wind: " + @weather_data[0].text
    cont
end

def humidity
    puts
  puts "Current humidity: " + @weather_data[1].text
    cont
end

def visibility
    puts
  puts "Current visibility: " + @weather_data[4].text
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

# Call function
init