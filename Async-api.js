 let currentDemo = 'sync-blocking';
        let demoCounter = 0;

        function selectDemo(demoId) {
            // Hide all demos
            document.querySelectorAll('.demo').forEach(demo => {
                demo.classList.remove('active');
            });

            // Show selected demo
            document.getElementById(demoId).classList.add('active');
            currentDemo = demoId;

            // Update button states
            document.querySelectorAll('.demo-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            // Update progress
            updateProgress();
        }

        function updateProgress() {
            const totalDemos = 14;
            const demoIndex = Array.from(document.querySelectorAll('.phase-title')).length;
            const progress = (demoIndex / totalDemos) * 100;
            document.getElementById('progress-fill').style.width = progress + '%';
            document.getElementById('progress-count').textContent = Math.min(demoIndex + 1, totalDemos);
        }

        function log(elementId, message, type = 'log') {
            const output = document.getElementById(elementId);
            const timestamp = new Date().toLocaleTimeString();
            
            let className = 'output-log';
            if (type === 'success') className = 'output-success';
            if (type === 'error') className = 'output-error';
            if (type === 'info') className = 'output-info';
            if (type === 'warning') className = 'output-warning';

            const line = document.createElement('div');
            line.className = 'output-line';
            line.innerHTML = `<span class="output-time">[${timestamp}]</span> <span class="${className}">${escapeHtml(message)}</span>`;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        }

        function clearOutput(elementId) {
            document.getElementById(elementId).innerHTML = '';
        }

        function escapeHtml(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return String(text).replace(/[&<>"']/g, m => map[m]);
        }

        // ===== PHASE 1: SYNC vs ASYNC =====
        function runSyncDemo() {
            clearOutput('output-sync');
            log('output-sync', 'Starting synchronous loop...');
            log('output-sync', 'WARNING: Page will freeze!', 'warning');
            
            const start = performance.now();
            for (let i = 0; i < 3000000000; i++) {
                if (i % 500000000 === 0) {
                    log('output-sync', `Counted to ${i}...`, 'info');
                }
            }
            const end = performance.now();
            
            log('output-sync', `✅ Sync operation completed! Took ${(end - start).toFixed(2)}ms`, 'success');
            log('output-sync', 'Page should now be responsive again', 'success');
        }

        function runAsyncDemo() {
            clearOutput('output-sync');
            log('output-sync', 'Starting async operation...');
            log('output-sync', '✅ Page stays responsive!', 'success');
            
            setTimeout(() => {
                log('output-sync', '⏰ Task completed after 2 seconds', 'success');
            }, 2000);

            for (let i = 1; i <= 3; i++) {
                setTimeout(() => {
                    log('output-sync', `Message ${i} at ${i} second(s)`, 'info');
                }, i * 1000);
            }
        }

        // ===== PHASE 2: CALLBACKS =====
        function runCallbackDemo() {
            clearOutput('output-callback');
            
            function simulateDataFetch(name, callback) {
                log('output-callback', `Loading data for ${name}...`);
                setTimeout(() => {
                    const user = { name, email: name.toLowerCase() + '@example.com', id: Math.random() };
                    callback(user);
                }, 1500);
            }

            function displayUser(user) {
                log('output-callback', `✅ Welcome ${user.name}!`, 'success');
                log('output-callback', `📧 Email: ${user.email}`, 'info');
                log('output-callback', `🆔 ID: ${user.id.toFixed(0)}`, 'info');
            }

            simulateDataFetch('Alice', displayUser);
        }

        function orderCoffee() {
            const status = document.getElementById('order-status');
            status.innerHTML = '⏳ Preparing order...';
            
            function makeCoffe(size, callback) {
                setTimeout(() => {
                    log('output-callback', `☕ Making ${size} coffee...`, 'info');
                    callback();
                }, 2000);
            }

            function addCream(callback) {
                setTimeout(() => {
                    log('output-callback', '🥛 Adding cream...', 'info');
                    callback();
                }, 1000);
            }

            function serve() {
                log('output-callback', '✅ Your order is ready!', 'success');
                status.innerHTML = '✅ Order Complete! ☕';
            }

            // Callback chain
            makeCoffe('Large', () => {
                addCream(() => {
                    serve();
                });
            });
        }

        // ===== PHASE 3: CALLBACK HELL =====
        function runCallbackHellDemo() {
            clearOutput('output-callback-hell');
            
            function step1(callback) {
                log('output-callback-hell', 'Step 1: Fetching user...', 'info');
                setTimeout(() => {
                    const user = { id: 1, name: 'Alice' };
                    log('output-callback-hell', `✅ Got user: ${user.name}`);
                    callback(user);
                }, 500);
            }

            function step2(userId, callback) {
                log('output-callback-hell', `Step 2: Fetching orders for user ${userId}...`, 'info');
                setTimeout(() => {
                    const orders = [{ id: 101 }, { id: 102 }];
                    log('output-callback-hell', `✅ Got ${orders.length} orders`);
                    callback(orders);
                }, 500);
            }

            function step3(orderId, callback) {
                log('output-callback-hell', `Step 3: Fetching details for order ${orderId}...`, 'info');
                setTimeout(() => {
                    const details = { amount: 99.99, status: 'shipped' };
                    log('output-callback-hell', `✅ Order ${orderId}: $${details.amount} (${details.status})`);
                    callback(details);
                }, 500);
            }

            // This is callback hell!
            step1((user) => {
                step2(user.id, (orders) => {
                    step3(orders[0].id, (details) => {
                        log('output-callback-hell', '✅✅✅ All steps complete!', 'success');
                    });
                });
            });
        }

        // ===== PHASE 4: PROMISES =====
        function runPromiseDemo() {
            clearOutput('output-promise');
            
            const fetchUser = new Promise((resolve, reject) => {
                log('output-promise', 'Creating promise...', 'info');
                setTimeout(() => {
                    const user = { name: 'Alice', id: 1 };
                    log('output-promise', 'Promise resolving...', 'info');
                    resolve(user);
                }, 2000);
            });

            fetchUser
                .then(user => {
                    log('output-promise', `✅ Promise resolved with:`, 'success');
                    log('output-promise', `Name: ${user.name}`, 'info');
                    log('output-promise', `ID: ${user.id}`, 'info');
                })
                .catch(error => {
                    log('output-promise', `❌ Promise rejected: ${error}`, 'error');
                });
        }

        function randomPromise() {
            const element = document.getElementById('promise-result');
            element.innerHTML = '<span class="spinner"></span> Processing...';
            
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.5) {
                        resolve({ message: '✅ Success!' });
                    } else {
                        reject({ message: '❌ Failed!' });
                    }
                }, 2000);
            })
                .then(result => {
                    element.innerHTML = `<span class="output-success">${result.message}</span>`;
                })
                .catch(error => {
                    element.innerHTML = `<span class="output-error">${error.message}</span>`;
                });
        }

        // ===== PHASE 5: PROMISE CHAINING =====
        function runChainingDemo() {
            clearOutput('output-chaining');
            
            function fetchUser(id) {
                return new Promise(resolve => {
                    log('output-chaining', `📥 Fetching user ${id}...`, 'info');
                    setTimeout(() => {
                        resolve({ id, name: 'Alice', companyId: 10 });
                    }, 500);
                });
            }

            function fetchCompany(companyId) {
                return new Promise(resolve => {
                    log('output-chaining', `📥 Fetching company ${companyId}...`, 'info');
                    setTimeout(() => {
                        resolve({ id: companyId, name: 'Tech Corp', employees: 50 });
                    }, 500);
                });
            }

            fetchUser(1)
                .then(user => {
                    log('output-chaining', `✅ Got user: ${user.name}`, 'success');
                    return fetchCompany(user.companyId);
                })
                .then(company => {
                    log('output-chaining', `✅ Got company: ${company.name} (${company.employees} employees)`, 'success');
                    log('output-chaining', '✅✅ All data loaded!', 'success');
                })
                .catch(error => {
                    log('output-chaining', `❌ Error: ${error}`, 'error');
                });
        }

        // ===== PHASE 6: PROMISE STATES =====
        function runStatesDemo() {
            clearOutput('output-states');
            
            log('output-states', '1️⃣ PENDING: Promise created, waiting...', 'warning');
            
            new Promise((resolve) => {
                setTimeout(() => {
                    log('output-states', '2️⃣ FULFILLED: Promise settled with success!', 'success');
                    resolve('Data loaded');
                }, 2000);
            }).then(result => {
                log('output-states', `✅ Result: ${result}`, 'success');
            });
        }

        function promiseSuccess() {
            const el = document.getElementById('state-demo');
            el.innerHTML = '<span class="spinner"></span> Processing...';
            
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('✅ Operation succeeded!');
                }, 1500);
            }).then(result => {
                el.innerHTML = `<span class="output-success">${result}</span>`;
            });
        }

        function promiseFailure() {
            const el = document.getElementById('state-demo');
            el.innerHTML = '<span class="spinner"></span> Processing...';
            
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('❌ Something went wrong!'));
                }, 1500);
            }).catch(error => {
                el.innerHTML = `<span class="output-error">${error.message}</span>`;
            });
        }

        function promiseTimeout() {
            const el = document.getElementById('state-demo');
            el.innerHTML = '<span class="spinner"></span> Waiting 3 seconds...';
            
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('✅ Resolved after 3 seconds!');
                }, 3000);
            }).then(result => {
                el.innerHTML = `<span class="output-success">${result}</span>`;
            });
        }

        // ===== PHASE 7: ASYNC/AWAIT =====
        function runAsyncAwaitDemo() {
            clearOutput('output-async-await');
            
            async function loadUserData() {
                try {
                    log('output-async-await', '📥 Starting async operation...', 'info');
                    
                    // Simulate first async call
                    const user = await new Promise(resolve => {
                        setTimeout(() => {
                            resolve({ id: 1, name: 'Alice' });
                        }, 1000);
                    });
                    log('output-async-await', `✅ Got user: ${user.name}`, 'success');
                    
                    // Simulate second async call
                    const orders = await new Promise(resolve => {
                        setTimeout(() => {
                            resolve([{ id: 101 }, { id: 102 }]);
                        }, 1000);
                    });
                    log('output-async-await', `✅ Got ${orders.length} orders`, 'success');
                    
                    log('output-async-await', '✅ All data loaded with async/await!', 'success');
                } catch (error) {
                    log('output-async-await', `❌ Error: ${error}`, 'error');
                }
            }

            loadUserData();
        }

        // ===== PHASE 8: PARALLEL OPERATIONS =====
        function runParallelDemo() {
            clearOutput('output-parallel');
            
            async function loadDashboard() {
                const startTime = performance.now();
                
                try {
                    log('output-parallel', '📊 Loading dashboard...', 'info');
                    
                    const [users, posts, comments] = await Promise.all([
                        new Promise(resolve => {
                            setTimeout(() => resolve({ type: 'Users', count: 10 }), 1000);
                        }),
                        new Promise(resolve => {
                            setTimeout(() => resolve({ type: 'Posts', count: 50 }), 1000);
                        }),
                        new Promise(resolve => {
                            setTimeout(() => resolve({ type: 'Comments', count: 200 }), 1000);
                        })
                    ]);
                    
                    const elapsed = (performance.now() - startTime).toFixed(0);
                    
                    log('output-parallel', `✅ ${users.type}: ${users.count}`, 'success');
                    log('output-parallel', `✅ ${posts.type}: ${posts.count}`, 'success');
                    log('output-parallel', `✅ ${comments.type}: ${comments.count}`, 'success');
                    log('output-parallel', `⚡ All loaded in parallel in ${elapsed}ms!`, 'success');
                } catch (error) {
                    log('output-parallel', `❌ Error: ${error}`, 'error');
                }
            }

            loadDashboard();
        }

        function runSequential() {
            const el = document.getElementById('perf-output');
            el.innerHTML = '<span class="spinner"></span> Running sequential...';
            
            async function sequential() {
                const start = performance.now();
                await new Promise(r => setTimeout(r, 1000));
                await new Promise(r => setTimeout(r, 1000));
                await new Promise(r => setTimeout(r, 1000));
                const elapsed = (performance.now() - start).toFixed(0);
                el.innerHTML = `<span class="output-warning">🐢 Sequential: ${elapsed}ms (Three 1s tasks = 3s total)</span>`;
            }
            sequential();
        }

        function runParallel() {
            const el = document.getElementById('perf-output');
            el.innerHTML = '<span class="spinner"></span> Running parallel...';
            
            async function parallel() {
                const start = performance.now();
                await Promise.all([
                    new Promise(r => setTimeout(r, 1000)),
                    new Promise(r => setTimeout(r, 1000)),
                    new Promise(r => setTimeout(r, 1000))
                ]);
                const elapsed = (performance.now() - start).toFixed(0);
                el.innerHTML = `<span class="output-success">🐇 Parallel: ${elapsed}ms (Three 1s tasks running together = 1s total)</span>`;
            }
            parallel();
        }

        // ===== PHASE 9: FETCH =====
        function runFetchBasicDemo() {
            clearOutput('output-fetch');
            
            async function getUser() {
                try {
                    log('output-fetch', '📥 Fetching user from JSONPlaceholder API...', 'info');
                    
                    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
                    log('output-fetch', `Response status: ${response.status}`, 'info');
                    
                    const data = await response.json();
                    log('output-fetch', `✅ Got user: ${data.name}`, 'success');
                    log('output-fetch', `📧 Email: ${data.email}`, 'info');
                    log('output-fetch', `🌐 Website: ${data.website}`, 'info');
                } catch (error) {
                    log('output-fetch', `❌ Fetch error: ${error.message}`, 'error');
                }
            }

            getUser();
        }

        function fetchUserData() {
            const el = document.getElementById('fetch-results');
            el.innerHTML = '<span class="spinner"></span> Loading...';
            
            fetch('https://jsonplaceholder.typicode.com/users/1')
                .then(r => r.json())
                .then(data => {
                    el.innerHTML = `
                        <div style="background: #e3f2fd; padding: 10px; border-radius: 5px;">
                            <strong>👤 ${data.name}</strong><br>
                            📧 ${data.email}<br>
                            📱 ${data.phone}
                        </div>
                    `;
                })
                .catch(err => {
                    el.innerHTML = `<span class="output-error">Error: ${err.message}</span>`;
                });
        }

        function fetchPostsData() {
            const el = document.getElementById('fetch-results');
            el.innerHTML = '<span class="spinner"></span> Loading...';
            
            fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
                .then(r => r.json())
                .then(data => {
                    let html = '<div style="background: #f3e5f5; padding: 10px; border-radius: 5px;">';
                    data.forEach(post => {
                        html += `<strong>📝 ${post.title.substring(0, 40)}...</strong><br>`;
                    });
                    html += '</div>';
                    el.innerHTML = html;
                })
                .catch(err => {
                    el.innerHTML = `<span class="output-error">Error: ${err.message}</span>`;
                });
        }

        function fetchCommentsData() {
            const el = document.getElementById('fetch-results');
            el.innerHTML = '<span class="spinner"></span> Loading...';
            
            fetch('https://jsonplaceholder.typicode.com/comments?_limit=3')
                .then(r => r.json())
                .then(data => {
                    let html = '<div style="background: #e8f5e9; padding: 10px; border-radius: 5px;">';
                    html += `<strong>💬 Found ${data.length} comments:</strong><br>`;
                    data.forEach(c => {
                        html += `"${c.body.substring(0, 50)}..." - ${c.email}<br>`;
                    });
                    html += '</div>';
                    el.innerHTML = html;
                })
                .catch(err => {
                    el.innerHTML = `<span class="output-error">Error: ${err.message}</span>`;
                });
        }

        // ===== PHASE 10: JSON =====
        function runJSONDemo() {
            clearOutput('output-json');
            
            // String to Object
            const jsonString = '{"name":"Bob","age":30,"city":"NYC","hobbies":["coding","gaming"]}';
            log('output-json', '📦 JSON String:', 'info');
            log('output-json', jsonString);
            
            const obj = JSON.parse(jsonString);
            log('output-json', '✅ Parsed to JavaScript Object:', 'success');
            log('output-json', `Name: ${obj.name}`, 'info');
            log('output-json', `Age: ${obj.age}`, 'info');
            log('output-json', `City: ${obj.city}`, 'info');
            log('output-json', `Hobbies: ${obj.hobbies.join(', ')}`, 'info');
            
            // Object to String
            const newObj = { title: 'Learning APIs', completed: true, score: 95 };
            const newJsonString = JSON.stringify(newObj);
            log('output-json', '✅ Object to JSON String:', 'success');
            log('output-json', newJsonString);
        }

        function parseJSONInput() {
            const input = document.getElementById('json-input').value;
            const el = document.getElementById('json-parsed');
            
            try {
                const obj = JSON.parse(input);
                let html = '<div style="background: #e8f5e9; padding: 10px; border-radius: 5px;"><strong>✅ Parsed Successfully:</strong><br>';
                html += `<code>${JSON.stringify(obj, null, 2)}</code></div>`;
                el.innerHTML = html;
            } catch (err) {
                el.innerHTML = `<div style="background: #ffebee; padding: 10px; border-radius: 5px;"><strong class="output-error">❌ Invalid JSON:</strong><br>${err.message}</div>`;
            }
        }

        // ===== PHASE 11: TRY/CATCH =====
        function runTryCatchDemo() {
            clearOutput('output-try-catch');
            
            async function safeFetch() {
                try {
                    log('output-try-catch', '🔍 Attempting fetch...', 'info');
                    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const data = await response.json();
                    log('output-try-catch', `✅ Success: ${data.name}`, 'success');
                } catch (error) {
                    log('output-try-catch', `❌ Caught error: ${error.message}`, 'error');
                } finally {
                    log('output-try-catch', '🔄 Finally block: Cleanup done', 'info');
                }
            }

            safeFetch();
        }

        function tryCatchSuccess() {
            const el = document.getElementById('try-result');
            el.innerHTML = '<span class="spinner"></span> Running...';
            
            async function test() {
                try {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    el.innerHTML = '<span class="output-success">✅ Try block succeeded<br>Catch block skipped<br>Finally block ran</span>';
                } catch (e) {
                    el.innerHTML = '<span class="output-error">❌ Error</span>';
                } finally {
                    // Even on success, finally runs
                }
            }
            test();
        }

        function tryCatchError() {
            const el = document.getElementById('try-result');
            el.innerHTML = '<span class="spinner"></span> Running...';
            
            async function test() {
                try {
                    throw new Error('Oops!');
                } catch (e) {
                    el.innerHTML = `<span class="output-success">✅ Try block threw error<br>❌ Catch block caught: "${e.message}"<br>Finally would run after</span>`;
                } finally {
                    // Cleanup
                }
            }
            test();
        }

        function tryCatchFinally() {
            const el = document.getElementById('try-result');
            el.innerHTML = '<span class="spinner"></span> Running...';
            
            async function test() {
                let result = [];
                try {
                    result.push('✅ Try block ran');
                    throw new Error('Something failed');
                } catch (e) {
                    result.push(`❌ Catch block caught: "${e.message}"`);
                } finally {
                    result.push('🔄 Finally always runs (cleanup)');
                }
                el.innerHTML = `<span class="output-success">${result.join('<br>')}</span>`;
            }
            test();
        }

        // ===== PHASE 12: ERROR HANDLING =====
        function runErrorHandlingDemo() {
            clearOutput('output-errors');
            
            async function robustFetch(url, retries = 2) {
                for (let attempt = 1; attempt <= retries; attempt++) {
                    try {
                        log('output-errors', `Attempt ${attempt}...`, 'info');
                        const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
                        if (!response.ok) throw new Error(`HTTP ${response.status}`);
                        return await response.json();
                    } catch (error) {
                        if (attempt === retries) {
                            log('output-errors', `❌ Failed after ${retries} attempts: ${error.message}`, 'error');
                            throw error;
                        }
                        log('output-errors', `Retry in 1s...`, 'warning');
                        await new Promise(r => setTimeout(r, 1000));
                    }
                }
            }

            robustFetch('https://jsonplaceholder.typicode.com/users/1', 2)
                .then(() => log('output-errors', '✅ Finally succeeded!', 'success'))
                .catch(() => {});
        }

        // ===== PHASE 13: RETRY =====
        function runRetryDemo() {
            clearOutput('output-retry');
            
            let attemptCount = 0;

            function simulateUnstableAPI() {
                attemptCount++;
                return new Promise((resolve, reject) => {
                    // Fails first 2 times, succeeds on 3rd
                    if (attemptCount < 3) {
                        reject(new Error('Network error'));
                    } else {
                        resolve({ data: 'Success!' });
                    }
                });
            }

            async function retryLogic() {
                for (let i = 1; i <= 5; i++) {
                    try {
                        log('output-retry', `Attempt ${i}...`, 'info');
                        const result = await simulateUnstableAPI();
                        log('output-retry', `✅ Success on attempt ${i}!`, 'success');
                        return result;
                    } catch (error) {
                        if (i === 5) {
                            log('output-retry', `❌ Failed after 5 attempts`, 'error');
                            return;
                        }
                        const delay = Math.pow(2, i - 1) * 500;
                        log('output-retry', `Failed. Retrying in ${delay}ms...`, 'warning');
                        await new Promise(r => setTimeout(r, delay));
                    }
                }
            }

            retryLogic();
        }

        // ===== PHASE 14: TIMEOUT =====
        function runTimeoutDemo() {
            clearOutput('output-timeout');
            
            async function fetchWithTimeout(url, timeoutMs = 3000) {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
                
                try {
                    log('output-timeout', `Fetching with ${timeoutMs}ms timeout...`, 'info');
                    const response = await fetch(url, { signal: controller.signal });
                    clearTimeout(timeoutId);
                    
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const data = await response.json();
                    log('output-timeout', `✅ Got response before timeout!`, 'success');
                    return data;
                } catch (error) {
                    clearTimeout(timeoutId);
                    if (error.name === 'AbortError') {
                        log('output-timeout', `❌ Request timed out after ${timeoutMs}ms`, 'error');
                    } else {
                        log('output-timeout', `❌ Error: ${error.message}`, 'error');
                    }
                }
            }

            fetchWithTimeout('https://jsonplaceholder.typicode.com/users/1', 5000);
        }

        // ===== PHASE 15: DEBOUNCE =====
        function debounce(fn, delayMs) {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => fn(...args), delayMs);
            };
        }

        const debouncedSearch = debounce((query) => {
            if (query.length > 0) {
                log('output-debounce', `🔍 Searching for: "${query}"`, 'info');
                document.getElementById('debounce-results').innerHTML = `<span class="output-info">Searching for "${query}"...</span>`;
            }
        }, 500);

        document.addEventListener('DOMContentLoaded', () => {
            const debounceInput = document.getElementById('debounce-input');
            if (debounceInput) {
                debounceInput.addEventListener('input', (e) => {
                    debouncedSearch(e.target.value);
                });
            }
        });

        // ===== PHASE 16: DASHBOARD =====
        function runDashboardDemo() {
            clearOutput('output-dashboard');
            document.getElementById('table-body').innerHTML = '<tr><td colspan="4" style="text-align:center;"><span class="spinner"></span> Loading...</td></tr>';
            
            async function loadDashboard() {
                const startTime = performance.now();
                
                try {
                    log('output-dashboard', '📊 Loading dashboard data (using Promise.all)...', 'info');
                    
                    const [users, posts, comments] = await Promise.all([
                        fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
                        fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
                        fetch('https://jsonplaceholder.typicode.com/comments').then(r => r.json())
                    ]);
                    
                    const elapsed = (performance.now() - startTime).toFixed(0);
                    
                    document.getElementById('users-card').textContent = users.length;
                    document.getElementById('posts-card').textContent = posts.length;
                    document.getElementById('comments-card').textContent = comments.length;
                    document.getElementById('speed-card').textContent = elapsed + 'ms';
                    
                    const tbody = document.getElementById('table-body');
                    tbody.innerHTML = `
                        <tr><td>👥 Users</td><td>${users.length}</td><td>✅ Success</td><td>${(elapsed/3).toFixed(0)}ms</td></tr>
                        <tr><td>📝 Posts</td><td>${posts.length}</td><td>✅ Success</td><td>${(elapsed/3).toFixed(0)}ms</td></tr>
                        <tr><td>💬 Comments</td><td>${comments.length}</td><td>✅ Success</td><td>${(elapsed/3).toFixed(0)}ms</td></tr>
                    `;
                    
                    log('output-dashboard', `✅ All data loaded in ${elapsed}ms using parallel requests!`, 'success');
                    log('output-dashboard', `📊 Users: ${users.length}`, 'info');
                    log('output-dashboard', `📝 Posts: ${posts.length}`, 'info');
                    log('output-dashboard', `💬 Comments: ${comments.length}`, 'info');
                } catch (error) {
                    log('output-dashboard', `❌ Error loading dashboard: ${error.message}`, 'error');
                    document.getElementById('table-body').innerHTML = '<tr><td colspan="4" style="color:red;">Error loading data</td></tr>';
                }
            }

            loadDashboard();
        }

        function compareSpeeds() {
            clearOutput('output-dashboard');
            document.getElementById('table-body').innerHTML = '<tr><td colspan="4" style="text-align:center;"><span class="spinner"></span> Comparing...</td></tr>';
            
            async function runComparison() {
                log('output-dashboard', '⏱️ Testing SEQUENTIAL (one after another)...', 'info');
                
                const seqStart = performance.now();
                const user = await fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json());
                const posts = await fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json());
                const comment = await fetch('https://jsonplaceholder.typicode.com/comments/1').then(r => r.json());
                const seqTime = (performance.now() - seqStart).toFixed(0);
                
                log('output-dashboard', `🐢 Sequential completed in ${seqTime}ms`, 'warning');
                
                log('output-dashboard', '⏱️ Testing PARALLEL (all at once)...', 'info');
                
                const parStart = performance.now();
                await Promise.all([
                    fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
                    fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
                    fetch('https://jsonplaceholder.typicode.com/comments/1').then(r => r.json())
                ]);
                const parTime = (performance.now() - parStart).toFixed(0);
                
                log('output-dashboard', `🐇 Parallel completed in ${parTime}ms`, 'success');
                log('output-dashboard', `⚡ Parallel is ${Math.round(seqTime/parTime)}x faster!`, 'success');
                
                document.getElementById('table-body').innerHTML = `
                    <tr><td>🐢 Sequential</td><td>3 requests</td><td>⏱️ ${seqTime}ms</td><td>Slower</td></tr>
                    <tr><td>🐇 Parallel</td><td>3 requests</td><td>⚡ ${parTime}ms</td><td>Faster!</td></tr>
                `;
            }

            runComparison();
        }

        function clearDashboard() {
            clearOutput('output-dashboard');
            document.getElementById('users-card').textContent = '-';
            document.getElementById('posts-card').textContent = '-';
            document.getElementById('comments-card').textContent = '-';
            document.getElementById('speed-card').textContent = '-';
            document.getElementById('table-body').innerHTML = '<tr><td colspan="4" style="text-align:center;">Dashboard cleared</td></tr>';
        }

        // Initialize
        updateProgress();