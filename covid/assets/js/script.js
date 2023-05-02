$(".btn-long").hide();
$(".cimg").hide();
var check = 0

$(".yes").click(function () {
    check = check + 1;
});
$(".no").click(function () {
    check = check - 1;
});

var questions_bn = [
    "আপনার কাশি আছে?",
    "আপনার কি সর্দি লেগেছে?",
    "আপনার কি ডায়রিয়া হচ্ছে?",
    "আপনার গলা ব্যথা হচ্ছে?",
    "আপনার কি শরীরে ব্যথা হচ্ছে?",
    "আপনার মাথাব্যথা হচ্ছে?",
    "আপনার কি জ্বর আছে(তাপমাত্রা ৩৭.৪°C বা ৯৯.৩২°F এর বেশি)?",
    "আপনার কি শ্বাস নিতে সমস্যা হচ্ছে?",
    "আপনি কি ক্লান্তি অনুভব করছেন?",
    "আপনি কি গত ১৪ দিনের মধ্যে সম্প্রতি ভ্রমণ করেছেন?",
    "আপনি কি কোভিড-১৯ সংক্রমিত কোনো এলাকায় গিয়েছেন?",
    "আপনার সাথে কি কোনো কোভিড-১৯ রোগীর সরাসরি যোগাযোগ রয়েছে বা যত্ন নিয়েছেন?",
];

var questions_en = [
    "Do you have a cough?",
    "Do you have a cold?",
    "Do you have diarrhea?",
    "Do you have a sore throat?",
    "Are you feeling pain in your body?",
    "Do you have a headache?",
    "Do you have a fever(temperature above 37.4°C or 99.32°F)?",
    "Do you have trouble in breathing?",
    "Do you feel tired?",
    "Have you traveled recently in the last 14 days?",
    "Have you been to an area infected with Covid-19?",
    "Do you have direct contact with any Covid-19 patient or did you take care of them?",
];

var images = [
    "cough",
    "sneezing",
    "diarrhoea",
    "sore_throat",
    "chills",
    "dizzy",
    "fever-2",
    "breathing",
    "fatigue",
    "travel",
    "covid_area",
    "covid_patient",
];

var urlParams = new URLSearchParams(window.location.search);
var lang = urlParams.get('lang');
if (lang == "bn") {
    $(".language .en").removeClass("active")
    $(".language .bn").addClass("active")
    $(".form").attr("lang", "bn");
    var questions = questions_bn;
    $(".ques").html("কোভিড-১৯ স্ব-মূল্যায়ন পরীক্ষা শুরু করতে নিচের বাটনটি প্রেস করুন।");
    $(".start").html("শুরু করুন");
    $(".yes").html("হ্যাঁ");
    $(".no").html("না");
} else {
    $(".form").attr("lang", "en");
    var questions = questions_en;
}

var question_count = -1;

const riskThresholds = {
    "mild": 1,
    "moderate": 5,
    "severe": 10,
};

$(".start").click(function () {
    $('.topimg').css("background-image", "url('assets/svg/logo.svg')");
    $('.topimg').css("height", "70px");
    $(".start").hide();
    $(".cimg").css("margin-top", "25px");
    $(".cimg").show();
    $(".btn-long").show();
    $(".btn-long").click(function () {
        console.log(check);
    });
});

$(".btn").click(function () {
    question_count++;
    $(".cimg").css("background-image", "url('assets/svg/" + images[question_count] + ".svg')");
    $(".ques").html(questions[question_count]);

    if (question_count >= questions.length) {
        let riskLevel, qClass;
        if (check < riskThresholds.mild) {
            riskLevel = lang === "bn" ? "সামান্য" : "Mild";
            qClass = "mild";
        } else if (check < riskThresholds.moderate) {
            riskLevel = lang === "bn" ? "মাঝারি" : "Moderate";
            qClass = "moderate";
        } else {
            riskLevel = lang === "bn" ? "গুরুতর" : "Severe";
            qClass = "severe";
        }

        // display the result to the user
        $(".ques").html(lang === "bn" ? `আপনার ঝুঁকির মাত্রা: <span class=${qClass}>${riskLevel}</span>` : `Your Risk Level: <span class=${qClass}>${riskLevel}</span>`);
        $(".btn").show();
        $(".btn-long").hide();
        $(".btn").html(lang === "bn" ? "রিসেট <i class='fa-light fa-arrow-rotate-left'></i>" : "Reset <i class='fa-light fa-arrow-rotate-left'></i>");
        $(".btn").click(function () {
            location.reload();
        });
    }
});