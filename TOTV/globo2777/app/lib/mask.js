/**
 * @author Kaio Sergio
 */
Mask = 
                  {
                      mask: function(_field, _function, _genericParameters) {
                          if (_genericParameters)
                              _field.value = _function(_field.value, _genericParameters);
                          else
                              _field.value = _function(_field.value);
                      },
                  
                      generic: function(v, _genericParameters) {
                          var _regex = _genericParameters.regex;
                          var _syntax = _genericParameters.syntax;
                          var _maxValue = _genericParameters.maxValue;
                          v = v.replace(/D/g,"");
                          v = v.replace(_regex, _syntax);
                  
                          return (_maxValue != null) ? v.slice(0, _maxValue) : v;
                      },
                  
                     cell: function(v) {
                          v = v.replace(/\D/g,"");
                          v = v.replace(/^(\d\d)(\d)/g,"($1) $2");
                          v = v.replace(/(\d{5})(\d)/,"$1-$2");
                          return v.slice(0, 15);
                     },
                  
                  
                      phone: function(v) {
                          v = v.replace(/\D/g,"");
                          v = v.replace(/^(\d\d)(\d)/g,"($1) $2");
                          v = v.replace(/(\d{4})(\d)/,"$1-$2");
                          return v.slice(0, 14);
                      }
                  };
                 