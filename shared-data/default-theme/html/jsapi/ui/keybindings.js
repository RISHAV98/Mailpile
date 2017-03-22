// Providing Keybinding/Keyboard shortcuts via Mousetrap
Mailpile.initialize_keybindings = function() {
  Mousetrap.bind("?", function() { Mailpile.display_keybindings(); });
  Mousetrap.bindGlobal("esc", function() {
    $('input[type=text]').blur();
    $('textarea').blur();
  });

  // Map user/system configured bindings
	for (item in Mailpile.keybindings) {
	  var keybinding = Mailpile.keybindings[item];
    Mousetrap.bind(keybinding.keys, keybinding.callback);
	}
};

Mailpile.keybinding_move_message = function(add_tag) {
  // Has Messages
  var $context = Mailpile.UI.Selection.context(".selection-context");
  var selection = Mailpile.UI.Selection.selected($context);
  if (selection.length) {
    var tids = $context.find(".pile-results").data("tids");
    var delete_tags = ((tids || "") + "").split(/\s+/);
    delete_tags.push('new');

    Mailpile.UI.Tagging.tag_and_update_ui({
      add: add_tag,
      del: delete_tags,
      mid: selection,
      context: $context.find('.search-context').data('context')
    }, 'move');
  }
  else {
    console.log('FIXME: Provide helpful / unobstrusive UI feedback that tells a user they hit a keybinding, then fades away');
  }
};
