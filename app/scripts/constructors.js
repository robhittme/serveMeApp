function Remainder(monthly, tips) {
	this.monthly = monthly;
	this.tips = tips;
	remainder = monthly-tips;
};

function HourlyWage(tips, hours) {
	this.tips = tips;
	this.hours = hours;
	this.wage = tips/hours;
};

function MedalPercentage(tips, daily){
	this.tips = tips;
	this.daily = daily;
	
	this.medal= function() {
		if(tips >= daily) {
			return "Gold";
		}
		if(tips <= (daily/100)*85 && tips >= (daily/100)*71) {
			return "Silver";
		}
		if(tips <= (daily/100)*70 && tips >= (daily/100)*50) {
			return "Bronze";
		}
		else {
			return "";
		}
	};
};