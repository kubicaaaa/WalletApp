 <h2>WalletApp</h2>
 
 <p>Full Stack Web application built in Java using Spring Boot framework and React.js</p>

![preview](https://github.com/kubicaaaa/WalletApp/assets/136459875/0d6b9962-56c3-4b60-a293-6511f67893dc)


<h2>How it Works</h2>

<p>The program fetches the current ask price for the specified cryptocurrency from the Binance exchange. It calculates the bid price for the Bitget exchange, taking into account various fees and ensuring a profitable transaction. The program buys the cryptocurrency on Binance using the available USDT balance. After the purchase is successful, it withdraws the purchased cryptocurrency from Binance and deposits it into the Bitget exchange. Once the cryptocurrency is available on Bitget, the program sells it at the calculated bid price. The USDT proceeds from the sale are withdrawn from Bitget and deposited back into the Binance account. The process repeats indefinitely, with a 5-second delay between each iteration.</p>
