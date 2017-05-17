/*
User enters site
	User enters information into search bar
		CHECK INPUT:
			IF valid Zipcode:
				FindCityandState(query);
			IF State Name:
				Convert to Initials
				FindState('NJ');
			IF Valid State Initials:
				FindState('NJ');
			Else:
				Throw error:  Enter State or ZipCode

			FindCityAndState/FindState(){
				Center Map on state/zip code
				ProPublica('NJ') {
					populate senate Div
					populate Rep Div
					On click - {
						show profile image
						propulica(CRID){
							info
						}
						draw chart(openSecrets)
					}
				}
			}
*/