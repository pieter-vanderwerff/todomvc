//
// Application Specification
//

define( {

	plugins: [
		{ module: 'wire/debug', trace: { pointcut: /^((?!(model$|constructor$|template|localstorage|_|on)).*)$/ } }, // Stop constructor, model or anything beginning with _, template or localstorage being wrapped by the debugger
		{ module: 'wire/underscore/template' },
		{ module: 'wire/jquery/dom' },
		{ module: 'wire/backbone/events' }
	],


	//
	// General Properties
	//
	el_app: { $ref: 'dom.first!#todoapp' },
	el_input: { $ref: 'dom.first!#new-todo' },
	el_todos: { $ref: 'dom.first!#todo-list' },
	el_completed: { $ref: 'dom.first!#toggle-all' },
	el_footer: { $ref: 'dom.first!#footer' },

	CREATE_KEYS: [
		13 // Enter
	],


	//
	// Data Modules
	//

	// Local storage adapter
	localstorage_todos: {
		create: {
			module: 'backbone/localstorage',
			args: [
				// Local storage name space
				'todos-backbone-curl-wire'
			]
		}
	},


	//
	// Template Modules
	//

	// Individual todo template
	template_todo: { $ref: 'template.underscore!template/todo.html' },

	// Todos statistics template
	template_stats: { $ref: 'template.underscore!template/stats.html' },


	//
	// Backbone modules
	//

	// Application view
	// Controls the base interface elements
	view_app: {

		create: {
			module: 'view/app',
			args: [
				// Options
				{
					el: { $ref: 'el_app' }
				}
			]
		},

		properties: {

			// Properties
			CREATE_KEYS: { $ref: 'CREATE_KEYS' },

			// Add stats template
			template_stats: { $ref: 'template_stats' },

			// Elements
			el_input: { $ref: 'el_input' },
			el_todos: { $ref: 'el_todos' },
			el_completed: { $ref: 'el_completed' },
			el_footer: { $ref: 'el_footer' }
		},
		},

		connect: {
			'collection_todos': {
				'readyContext': 'addTodo',
				'updateStats': 'updateStats'
			}
		}

	},

	// Application collection
	// Holds all todos
	collection_todos: {

		create: {
			module: 'collection/todos',
			args: []
		},

		init: {
			fetch: [],
			setupStatsUpdates: []
		},

		properties: {

			// Sub context creator function
			createContext: { $ref: 'context_todo' },

			// Add our local storage adapter to the collection
			localStorage: { $ref: 'localstorage_todos' }
		},

		connect: {
			'view_app': {
				'createTodo': 'create',
				'updateTodos': 'update',
				'clearCompleted': 'clearCompleted'
			}
		}

	},

	// Application router
	// Changes the state of the application based on url routes
	router_app: {

		create: {
			module: 'helper/router',
			args: []
		},

		properties: {

			// Options for backbone history object
			history_options: {}

		}

	},


	//
	// Children Contexts
	//

	// An individual todo context specification
	context_todo: { wire: { spec: 'context/todo', defer: true, waitParent: true } }

} );