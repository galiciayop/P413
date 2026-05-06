angular.module('p413App', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/landing.html',
            controller: 'LandingController',
            controllerAs: 'landingCtrl'
        })
        .when('/booking', {
            templateUrl: 'templates/booking.html',
            controller: 'BookingController',
            controllerAs: 'bookingCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}])

.controller('MainController', ['$window', function($window) {
    var vm = this;
    vm.currentYear = new Date().getFullYear();
    
    // Initialize theme from localStorage or system preference
    vm.isDark = false;
    
    var savedTheme = $window.localStorage.getItem('theme');
    if (savedTheme) {
        vm.isDark = savedTheme === 'dark';
    } else {
        // Check system preference
        if ($window.matchMedia && $window.matchMedia('(prefers-color-scheme: dark)').matches) {
            vm.isDark = true;
        }
    }

    vm.toggleTheme = function() {
        vm.isDark = !vm.isDark;
        $window.localStorage.setItem('theme', vm.isDark ? 'dark' : 'light');
    };
}])

.controller('LandingController', [function() {
    var vm = this;
    
    vm.features = [
        {
            icon: '🔥',
            title: 'High-Intensity Interval Training',
            description: 'Push your limits with fast-paced workouts designed to maximize calorie burn and build explosive power.'
        },
        {
            icon: '🏋️‍♂️',
            title: 'Strength & Conditioning',
            description: 'Build functional muscle and improve your overall strength with our expertly programmed lifting sessions.'
        },
        {
            icon: '🏃‍♀️',
            title: 'Agility & Mobility',
            description: 'Enhance your movement quality, flexibility, and athletic agility for better performance in any sport.'
        }
    ];

    vm.testimonials = [
        {
            name: 'Sarah J.',
            role: 'Marathon Runner',
            text: '"P413 completely transformed my off-season training. The functional workouts gave me the edge I needed."'
        },
        {
            name: 'Mike T.',
            role: 'Working Professional',
            text: '"Incredible coaches and an amazing community. The 45-minute sessions are perfectly optimized for busy schedules."'
        }
    ];
}])

.controller('BookingController', ['$timeout', function($timeout) {
    var vm = this;
    
    vm.bookingData = {
        name: '',
        email: '',
        service: '',
        date: '',
        time: '',
        notes: ''
    };
    
    vm.services = [
        { id: '1-on-1', name: '1-on-1 Personal Training' },
        { id: 'small-group', name: 'Small Group Functional Class' },
        { id: 'assessment', name: 'Fitness Assessment & Planning' }
    ];

    // Generate upcoming dates for booking
    vm.availableDates = [];
    var today = new Date();
    for (var i = 1; i <= 14; i++) {
        var nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        // Format: 'Mon, Oct 12'
        var options = { weekday: 'short', month: 'short', day: 'numeric' };
        vm.availableDates.push(nextDate.toLocaleDateString('en-US', options));
    }

    vm.timeSlots = [
        '06:00 AM', '07:00 AM', '08:00 AM', 
        '12:00 PM', '04:00 PM', '05:30 PM', '06:30 PM', '07:30 PM'
    ];

    vm.status = 'idle'; // idle, submitting, success, error

    vm.submitBooking = function(form) {
        if (form.$invalid) return;

        vm.status = 'submitting';
        
        // Simulate API call
        $timeout(function() {
            vm.status = 'success';
            
            // Reset form
            vm.bookingData = {
                name: '',
                email: '',
                service: '',
                date: '',
                time: '',
                notes: ''
            };
            form.$setPristine();
            form.$setUntouched();
            
            // Reset status after a few seconds
            $timeout(function() {
                vm.status = 'idle';
            }, 5000);
            
        }, 1500);
    };
}]);
