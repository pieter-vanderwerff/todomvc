//
// Todos collection
//

define( [ 'backbone/wire_collection' ], function( Collection ) {

	// Extend from the backbone wire collection adapter so
	// we can take advantage of its wire context creation methods.
	return Collection.extend( {

		update: function( data, options ) {
			var self = this;

			self.invoke( 'save', data, options );
		}

	} );
	
} );