# The Eberban Arity Mismatch Resolution Algorithm

Given this example sentence:

`a mian etiansa meon`

The following steps are performed for each verb (`mian`, `etiansa` and `meon`):

## 1. Determine "effective SI" of the verb

Assuming that the verb doesn't already have a SI, determine chaining behaviour based on the defaults for each word according to the default chaining behaviour checker.

The default SI are:

* intransitive sharing: `seaouhe`
* transitive sharing: `seaouha`
* transitive equivalence: `seaouhai`

## 2a. Create all exposed variables for the verb

In most cases (the default ones), this means creating four variables. These variables are in an "exposed" property containing a list of variables with names and slots that they fill.

If there's a chaining place passed in to the recursive call, this is where it's matched with an exposed variable. It will not need to be created but instead matched with the left side slot of the verb.

## 2b. Create the chaining variable for the verb

This is again determined by the effective SI. The variable name must match the exposed variable that it is equivalent to, if required.

## 3. Recurse on "next" verb in the chain

Use the "next" property of the JSON that represents the next component of a verb chain and pass in the chaining variable.